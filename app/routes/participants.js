'use strict';

// Admin routes
var participants = require('../controllers/participants');
var authorization = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/participants', authorization.requiresLogin, participants.all);
    app.post('/participants', authorization.requiresLogin, participants.create);
    app.del('/participants/:participantId', authorization.requiresLogin, participants.destroy);

    app.param('participantId', participants.participant);
};
