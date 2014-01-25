'use strict';

var async = require('async');

var fs = require('fs');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config');
var mongoose = require('mongoose');

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Bootstrap models
var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

var Image = mongoose.model('Image');

var facesSpecsFile = __dirname + "/public/data/faces.json";
var facesSpecs = JSON.parse(fs.readFileSync(facesSpecsFile));

var subjectDir = facesSpecs.data.subjectDir;
var sampleFile = facesSpecs.data.sampleFile;

var images = [];

for (var f = 0; f < facesSpecs.data.filterStrength.length; f++) {
	for (var i = 1; i < facesSpecs.data.subjects + 1; i++) {
		for (var j = 1; j < facesSpecs.data.samples + 1; j++) {

			var filter = facesSpecs.data.filterStrength[f];

			var image = new Image({
				subject : i,
				url : filter + "/" + subjectDir + i + "/" + sampleFile + j + facesSpecs.data.ext,
				filter : filter
			});

			images.push(image);
		}
	}
}

function iterator(value, callback) {
	value.save(function (err, image) {
		console.log(image);
		callback(err);
	});
}

async.forEach(images, iterator, function (err) {
	if (err) {
		throw err;
	} else {
		console.log('Image collection populated!')
	}
});


