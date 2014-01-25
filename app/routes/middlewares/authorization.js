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