#!/usr/bin/env node

/****************************************************************************
*
* realms - A fullstack generation tool
* (c)Copyright 2014, Max Irwin
* MIT License
*
****************************************************************************/
// Module dependencies
var fs = require('fs');
var path = require('path');
var edda = require('edda');
var command = require('commander');
var generate = require('./generate');

// --------------------------------------------------------------------------
// Read in the package.json file:
var package = JSON.parse(fs.readFileSync(__dirname + "/package.json"));

// --------------------------------------------------------------------------
// Initialize cli
command
	.version(package.version)
	.usage('[options] <name>')
	.option('-i, --source <source>','The input file(s).')
	.option('-o, --target <target>','The output directory.')
	.option('-J, --jquery','Whether to output a jQuery Library')
	.option('-H, --heimdall','Whether to output a Heimdall Library')
	.option('-M, --model','Whether to output the model')
	.option('-D, --db','Whether to output the SQL to create a DB')
	.parse(process.argv);

if (!command.args || command.args.length!==1) command.help();
if (!command.source) command.help();
if (!command.target) command.help();

var appname = command.args[0];

console.log('Generating',appname);

// --------------------------------------------------------------------------
// Read in the file and parse
try{

	var template = 'heimdall.template.js';

	edda.run(command.source,template,{},null,function(err,api){

		console.log('Restlang Parsed',api.length,'files!');

		generate.heimdall(appname,command.target,function(err,data){

			console.log('Express Generated!');

			generate.output(appname,command.target,api,function(){

				console.log('Realms job completed!');

				process.exit();

			});

		});

	});



} catch(ex) {

	console.error(ex);
	process.exit();

}
