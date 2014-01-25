'use strict';

var async = require('async');
var mongoose = require('mongoose');
var Participant = mongoose.model('Participant');

exports.token = function(req, res, next, token) {
    req.token = token;
    next();
};

exports.test = function(req, res) {

	console.log(req.token);
	
	Participant.findOne({invite_token: req.token}, function (err, part) {
			if(err) {
				return res.render('main_views/notest');
				//return next(err);
			}
			
			if(part) {
				req.session.participant = part;
				res.render('main_views/index', {
        			participant: JSON.stringify(req.session.participant)
    			});
			} else {
				res.render('main_views/notest');
			}
		}
	);

    
};
