var depends = require('./depends');
var chpr = require('child_process');
var path = require('path');
var fs   = require('fs')

var Generate = module.exports = {};

Generate.heimdall = function(name,target,callback) {
	var output = {};
	express.create(name,target,function(err,data) {

		target = path.normalize(target + '/' + name + '/');

		output.express = data; 

		var apid = path.normalize(target + '/api');
		var ctld = path.normalize(target + '/controllers');
		var mdld = path.normalize(target + '/models');

		fs.mkdir(apid,function(){
			fs.mkdir(ctld,function(){
				fs.mkdir(mdld,function(){

					depends.on(target,{heimdall:"*"},function(err){
						if (err) { callback(err,output); return false; }
						express.init(target,function(err,data){
							output.npm = data;
							callback(err,output);
						});
					});

				});
			});
		})
	});
};

Generate.output = function(name,target,api,callback) {

	var done  = 0;
	var total = api.length;
	var apid  = path.normalize(target + '/' + name + '/api/');

	var outfile = function(filename,output) {
		filename = filename.replace(/\.api$/i,'.fs');
		fs.writeFile(filename,output,function(){
			console.log('Heimdall Generated:',filename);
			if(++done===total) callback();
		});

	};

	for(var i=0;i<total;i++) {
		outfile(apid+api[i].file,api[i].output);
	}

};

var express = {
	create : function(name,target,callback) {
		var command = 'express -f ' + name;
		var options = {cwd:target};
		exec(command,options,callback);
	},
	init : function(target,callback){
		var command = 'npm install';
		var options = {cwd:target};
		exec(command,options,callback);
	}
}

var exec = function(command,options,callback) {
	chpr.exec(command,options,function (exeErr, stdOut, stdErr) {
		if (exeErr) {
			process.stderr.write(exeErr);
			callback(exeErr);
		} else if (stdErr) {
			process.stderr.write(stdErr);
			callback('An error occurred while executing: ' + command);
		} else {
			process.stdout.write(stdOut);
			callback(null,true);
		}
	});
};
