'use strict';

var mongoose = require('mongoose');
var Admin = mongoose.model('Admin');

exports.signin = function(req, res) {
    res.render('admin_views/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

exports.signout = function(req, res) {
    req.logout();
    res.redirect('/admin/signin');
};

exports.admin = function(req, res) {
    res.render('admin_views/index', {
        admin: req.user ? JSON.stringify(req.user) : 'null'
    });
};


exports.session = function(req, res) {
    res.redirect('/admin');
};

exports.signup = function(req, res) {
    res.render('admin_views/signup', {
        title: 'Sign up',
        admin: new Admin()
    });
};

exports.create = function(req, res, next) {
    var admin = new Admin(req.body);
    var message = null;

    admin.provider = 'local';
    admin.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }

            return res.render('admin/signup', {
                message: message,
                admin: admin
            });
        }

        return res.redirect('/admin');

    });
};


/*
exports.me = function(req, res) {
    res.jsonp(req.admin || null);
};
*/

/*
exports.admin = function(req, res, next, id) {
    Admin.findOne({ _id: id })
         .exec(function(err, admin) {
            if (err) {
                return next(err);
            }

            if (!admin) {
                return next(new Error('Failed to load Admin ' + id));
            }

            req.profile = admin;

            next();
        });
};
*/