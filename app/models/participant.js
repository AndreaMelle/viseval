'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParticipantSchema = new Schema({
    invite_token: {
        type: String,
        unique: true,
        required: true
    },
    email: String,
    completed: {
    	type : Boolean,
    	'default' : false
    }
});

ParticipantSchema.path('email').validate(function(email) {
    return (typeof email === 'string' && email.length > 0);
}, 'Email cannot be blank');

ParticipantSchema.path('invite_token').validate(function(invite_token) {
    return (typeof invite_token === 'string' && invite_token.length > 0);
}, 'Invite token cannot be blank');

ParticipantSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Participant', ParticipantSchema);