//Adds dependencies to a package.json file

var fs = require('fs');
var path = require('path');

module.exports = {on:function(target,dependencies,callback){

	var file = path.normalize(target + '/package.json');
	fs.readFile(file,'utf8',function(err,pckg){

		if (err) { callback(err,output); return false; }

		try {
			pckg = JSON.parse(pckg);
		} catch(ex) {
			err = ex;
		}

		if (err) { callback(err,output); return false; }

		pckg.dependencies = pckg.dependencies||{};

		var d;
		for(d in dependencies) {
			if(dependencies.hasOwnProperty(d)) {
				pckg.dependencies[d] = dependencies[d];
			}
		} 

		try {
			pckg = JSON.stringify(pckg,null,2);
		} catch(ex) {
			err = ex;
		}

		if (err) { callback(err,output); return false; }

		fs.writeFile(file,pckg,callback);

	});

}};