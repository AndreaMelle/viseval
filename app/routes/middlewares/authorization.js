'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        //return res.send(401, 'Admin is not authorized');
        return res.redirect('/admin/signin');
    }
    next();
};

exports.requiresLogout = function(req, res, next) {
    if (req.isAuthenticated()) {
        return res.send(401, 'Admin is not authorized');
    }
    next();
};

exports.requiresParticipant = function(req, res, next) {
	if(!req.session.participant) {
		res.send('Forbidden.', 403);
	} else {
		next();
	}
};

exports.restrictParticipantToSelf = function(req, res, next) {

	if(!req.session.participant
		|| String(req.session.participant._id) !== String(req.question.participant)) {
		res.send('Unauthorized', 401);
	} else {
		next();
	}
};