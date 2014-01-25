'use strict';

var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    Admin = mongoose.model('Admin'),
    config = require('./config');


module.exports = function(passport) {
    
    // Serialize the user id to push into the session
    passport.serializeUser(function(admin, done) {
        done(null, admin.id);
    });

    // Deserialize the user object based on a pre-serialized token
    // which is the user id
    passport.deserializeUser(function(id, done) {
        Admin.findOne({
            _id: id
        }, '-salt -hashed_password', function(err, admin) {
            done(err, admin);
        });
    });

    // Use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            Admin.findOne({
                email: email
            }, function(err, admin) {
                if (err) {
                    return done(err);
                }
                if (!admin) {
                    return done(null, false, {
                        message: 'Unknown admin'
                    });
                }
                if (!admin.authenticate(password)) {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }
                return done(null, admin);
            });
        }
    ));
};