'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
    subject: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    filter: {
        type: Number,
        required: true,
    }
});

ImageSchema.statics.load = function(subject, filter, cb) {
    this.findOne({
        subject : subject,
        filter : filter
    }).exec(cb);
};

mongoose.model('Image', ImageSchema);

//var sampleFile = "/" + facesSpecs.data.sampleFile + 1 + facesSpecs.data.extension;

/*
var originalImage = {
        subject : subject,
        url : 0 + "/s" + subject + sampleFile,
        filter : 0
    };
*/

/*
var filteredImage = {
        subject : subject,
        url : filter + "/s" + subject + sampleFile,
        filter : filter
    };
*/

/*
var filteredImage = {
            subject : subject2,
            url : filter + "/s" + subject2 + sampleFile,
            filter : filter
        };
*/
