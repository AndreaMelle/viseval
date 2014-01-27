'use strict';

//Questions service used for questions REST endpoint

angular.module('common.questions').factory('Questions', ['$resource', function($resource) {

	return $resource('../questions/:questionId', {
		questionId: '@_id'
	}, {
        update: {
            method: 'PUT'
        }
    });
}]);