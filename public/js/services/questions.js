'use strict';

//Questions service used for questions REST endpoint

angular.module('common.questions').factory('Questions', ['$resource', function($resource) {

	// @ TODO this will break the admin code
	//host/... vs host/test/...


	return $resource('../questions/:questionId', {
		questionId: '@_id'
	});


}]);