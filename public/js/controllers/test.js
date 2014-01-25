'use strict';

angular.module('testApp.system').controller('TestController', ['$scope', 'Global', '$location', 'Questions', function ($scope, Global, $location, Questions) {
    $scope.global = Global;

    $scope.lastQuestion = false;
    $scope.hasAnswer = false;
    $scope.page = 0;
    $scope.question = null;

    $scope.getNext = function () {

        Questions.get({
            participant : Global.participant._id,
            page : $scope.page
        }, function(data) {

            $scope.question = data.question;

            if(data.lastPage) {
                $scope.lastQuestion = true;
            } else {
                $scope.page = data.page + 1;
            }

            // @ TODO: render question

            if ($scope.question.type === 'recognition') {

                console.info('../data/faces/' + $scope.question.original.url);

            } else if (($scope.question.type === 'identification')) {

                console.info('../data/faces/' + $scope.question.original.url);

            }

        });
    };

    $scope.end = function () {
    	console.info('Test started');
    	$location.path('/end');
    };


}]);
