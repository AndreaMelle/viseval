'use strict';

// Admin routes
var admins = require('../controllers/admins');
var authorization = require('./middlewares/authorization');

module.exports = function(app, passport) {

    app.get('/admin/signin', authorization.requiresLogout, admins.signin);
    app.get('/admin/signup', authorization.requiresLogout, admins.signup);
    app.get('/admin/signout', authorization.requiresLogin, admins.signout);
    app.get('/admin', authorization.requiresLogin, admins.admin);

    // Setting up the userId param
    //app.param('username', admins.user.username);

    app.post('/admins', admins.create);

    app.post('/admin/session', passport.authenticate('local', {
        failureRedirect: '/admin/signin',
        failureFlash: true
    }), admins.session);
};
