'use strict';

var index = require('../controllers/index');

module.exports = function(app) {
    app.get('/test/:token', index.test);
    app.param('token', index.token);
};
