'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var validatePresenceOf = function(value) {
    return value && value.length;
};

var AdminSchema = new Schema({
    name: String,
    email: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String
});

AdminSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function() {
    return this._password;
});

AdminSchema.path('name').validate(function(name) {
    return (typeof name === 'string' && name.length > 0);
}, 'Name cannot be blank');

AdminSchema.path('email').validate(function(email) {
    return (typeof email === 'string' && email.length > 0);
}, 'Email cannot be blank');

AdminSchema.path('username').validate(function(username) {
    return (typeof username === 'string' && username.length > 0);
}, 'Username cannot be blank');

AdminSchema.path('hashed_password').validate(function(hashed_password) {
    return (typeof hashed_password === 'string' && hashed_password.length > 0);
}, 'Password cannot be blank');

AdminSchema.pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.password))
        next(new Error('Invalid password'));
    else
        next();
});

AdminSchema.methods = {

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    encryptPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};

mongoose.model('Admin', AdminSchema);