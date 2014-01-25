'use strict';

var async = require('async');
var mongoose = require('mongoose');
var Participant = mongoose.model('Participant');
var Question = mongoose.model('Question');
var random = require('../utils/random');

exports.participant = function(req, res, next, id) {
    Participant.load(id, function(err, participant) {
        if (err) return next(err);
        if (!participant) return next(new Error('Failed to load participant ' + id));
        req.participant = participant;
        next();
    });
};

exports.all = function(req, res) {
    Participant.find()
        .exec(function(err, participants) {
            if (err) {
                res.send('error', 500);
            } else {
                res.jsonp(participants);
            }
        });
};

exports.create = function(req, res) {

    async.waterfall([
        
        function (next) {
            Participant.find({})
                .select('invite_token')
                .exec(next); //exec callback is (err, results) already
        },

        function (existingTokens, next) {
            var token = random.randomString(10);

            while(existingTokens.indexOf(token) > -1) {
                token = randomize();
            }

            var participant = new Participant(req.body);
            participant.invite_token = token;

            participant.save(function (err, participant, n) {
                next(err, participant);
            });
        }

    ], function(err, result) {
        if(err) {
            if (err.code === 11000) {
                return res.send('Conflict', 409);
            }
            else {
                if (err.name === 'ValidationError') {
                    return res.send(Object.keys(err.errors).map(function (errField) {
                        return err.errors[errField].message;
                    }).join('. '), 406);
                } else {
                    return res.send('Error', 500);
                }
            }
            return;
        } else {
            res.jsonp(result);
        }
    });
};

exports.destroy = function(req, res) {

    var participant = req.participant;

    participant.remove(function(err) {
        if (err) {
            return res.send('Error', 500);
        } else {
            res.jsonp({});
        }
    });
};





