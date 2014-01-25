'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    type: {
        type: String,
        'enum': ['identification', 'recognition'],
        required: true,
    },
    participant: {
        type: Schema.ObjectId,
        ref: 'Participant',
        required: true,
    },
    original: {
        type: Schema.ObjectId,
        ref: 'Image',
        required: true,
    },
    queries: [{
        image : {
            type: Schema.ObjectId,
            ref: 'Image',
            required: true,
        }
    }],
    rightAnswer : {
        type: Number,
    },
    participantAnswer : {
        type: Number,
    },
    filter : {
        type : Number
    }
    
});

// @TODO we can do advanced validation, by checking the answer validity based on the type of question

QuestionSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id })
        .populate('original')
        .populate('queries.image')
        .exec(cb);
};

mongoose.model('Question', QuestionSchema);
