'use strict';

var async = require('async');
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var helper = require('./questionHelpers');
var maxQuestionsPerPage = 1;

/*
exports.question = function(req, res, next, id) {
    Question.load(id, function(err, question) {
        if (err) return next(err);
        if (!question) return next(new Error('Failed to load question ' + id));
        req.question = question;
        next();
    });
};
*/

exports.get = function (req, res) {

    //console.log(req.query.participant);
    //console.log(req.query.page);

    if(!req.query.participant) {
        res.send('error', 500);
    }

    var page = req.query.page && parseInt(req.query.page, 10) || 0;
        
    async.parallel([
    
        function (next) {
            Question.find({participant : req.query.participant})
                .count(next);
        },
        
        function (next) {
            Question.find({participant : req.query.participant})
                .sort('_id')
                .skip(page * maxQuestionsPerPage)
                .limit(maxQuestionsPerPage)
                .exec(next);
        }
    
    ], function(err, results) {
            if (err) {
                res.send('error', 500);
            }
            
            var count = results[0];
            var questions = results[1];
            var lastPage = (page + 1) * maxQuestionsPerPage >= count;

            Question.load(questions[0]._id, function(err, q) {
                if (err) {
                    res.send('error', 500);
                } else {
                    res.jsonp({
                        question : q,
                        page : page,
                        lastPage : lastPage
                    });    
                }
            });

                
        }
    );

};

exports.create = function (req, res) {

    if (! req.query.participant) {
        console.log('Participant ID not provided');
        return res.send('error', 500);
    }

    helper.createQuestionSet(req.query.participant, function(err, result) {
        if (err) {
            console.log('Error creating question set');
            console.log(err);
            return res.send('error', 500);
        } else {
            return res.send('OK', 200);
        }
    });
};

exports.destroy = function (req, res) {

    if (! req.query.participant) {
        console.log('Participant ID not provided');
        return res.send('error', 500);
    }

    helper.removeQuestionSet(req.query.participant, function (err, result) {
        if (err) {
            console.log('Error deleting question set');
            return res.send('error', 500);
        } else {
            return res.send('OK', 200);
        }
    });
};

/*
exports.find = function(req, res) {
    res.jsonp(req.question);
};
*/