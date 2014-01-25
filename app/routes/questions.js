'use strict';

// Admin routes
var questions = require('../controllers/questions');
var authorization = require('./middlewares/authorization');

module.exports = function(app) {

	// all questions or by participant /questions?participant=_id
    app.get('/questions', questions.get);
    //app.get('/questions/:questionId', questions.find)

    // create question set for participant /questions?participant=_id
    app.post('/questions', authorization.requiresLogin, questions.create);

    // delete question set for participant /question?participant=_id
    app.del('/questions', authorization.requiresLogin, questions.destroy);

    //app.param('questionId', questions.question);
};
