'use strict';

var fs = require('fs');
var async = require('async');
var random = require('../utils/random');
var mongoose = require('mongoose');

var Image = mongoose.model('Image');
var Question = mongoose.model('Question');

var facesSpecs = JSON.parse(
    fs.readFileSync(__dirname + "/../../public/data/faces.json")
);

function shuffleQueries(question) {
    var shuffled = random.shuffleArray([0, 1, 2])
    var queriesClone = question.queries.slice(0);

    for (var i = 0; i < 3; i++) {
        question.queries[i] = queriesClone[shuffled[i]];    
    }

    return [question, shuffled[0]];
}

function getRecQ (filter, cb) {
    
    var question = new Question();
    question.type = 'recognition';
    var subjects = random.getNRandomInt(1,facesSpecs.data.subjects,3);

    async.parallel([

        function(cb) {
            Image.load(subjects[0], 0, function(err, image) {
                cb(err, image._id);
            });
        },

        function(cb) {
            Image.load(subjects[0], filter, function(err, image) {
                cb(err, image._id);
            });
        },

        function(cb) {
            Image.load(subjects[1], filter, function(err, image) {
                cb(err, image._id);
            });
        },

        function(cb) {
            Image.load(subjects[2], filter, function(err, image) {
                cb(err, image._id);
            });
        }

    ], function(err, results) {
        if (err) {
            return cb(err);
        } else {
            question.original =  results[0];
            for (var i = 1; i < results.length; i++) {
                question.queries.push({
                    image : results[i]
                });
            }

            var res = shuffleQueries(question);
            var q = res[0];
            q.rightAnswer = res[1] + 1;
            return cb(null, q);
        }
    });
}

function getIdeQ (filter, cb) {
    //3. extract a subject

    var question = new Question();
    question.type = 'identification';
    var subjects = random.getNRandomInt(1,facesSpecs.data.subjects,2);

    var rightAnswer = 1; //no

    if (Math.random > 0.5) {
        subjects[1] = subjects[0];
        rightAnswer = 2; //yes
    }

    async.parallel([

        function(cb) {
            Image.load(subjects[0], 0, function(err, image) {
                cb(err, image._id);
            });
        },

        function(cb) {
            Image.load(subjects[1], filter, function(err, image) {
                cb(err, image._id);
            });
        }

    ], function(err, results) {
        if (err) {
            return cb(err);
        } else {
            question.original =  results[0];
            question.queries.push({
                image : results[1]
            });
            question.rightAnswer = rightAnswer;
            return cb(null, question);
        }
    });
}

exports.createQuestionSet = function (participantId, callback) {

    var valuesRec = [];
    var valuesIde = [];

    var numRec = facesSpecs.test.recognition *  facesSpecs.test.forEachFilter;
    var numIde = facesSpecs.test.identification * facesSpecs.test.forEachFilter;

    for (var i = 1; i < facesSpecs.data.filterStrength.length; i++) {
        for(var j = 0; j < numRec; j++) {
            valuesRec.push(facesSpecs.data.filterStrength[i]);
        }

        for(var j = 0; j < numIde; j++) {
            valuesIde.push(facesSpecs.data.filterStrength[i]);
        }
    }

    function addQuestion(question, filter, cb) {
        question.participant = participantId;
        question.filter = filter;
        question.save(cb);
    }

    function iteratorRec(value, cb) {
        getRecQ(value, function(err, question) {
            if (err) {
                return cb(err);
            } else {
                addQuestion(question, value, cb);
            }
        });
    }

    function iteratorIde(value, cb) {
        getIdeQ(value, function(err, question) {
            if (err) {
                return cb(err);
            } else {
                addQuestion(question, value, cb);
            }
        });
    }

    async.parallelLimit([

        function (cb) {
            async.eachLimit(valuesRec, 2, iteratorRec, cb);
        },

        function (cb) {
            async.eachLimit(valuesIde, 2, iteratorIde, cb);
        }

    ], 2, function (err, result) {
        if (err) {
            return callback(err);
        } else {
            return callback(null);
        }
    });
}

exports.removeQuestionSet = function (participantId, callback) {
    Question.find(participantId)
        .exec(function(err, questions) {
            if (err) {
                callback(err);
            } else {

                var iterator = function(question, cb) {
                    question.remove(function(err) {
                        if (err) {
                            cb(err);
                        } else {
                            cb(null);
                        }
                    });
                }

                async.forEach(questions, iterator, callback);

            }
        });
}




