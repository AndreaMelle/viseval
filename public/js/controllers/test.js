'use strict';

angular.module('testApp.system').controller('QstCtrl', ['$scope', '$routeParams', 'Global', '$location', 'Questions', function ($scope, $routeParams, Global, $location, Questions) {

    $scope.global = Global;

    $scope.isLoaded = false;
    $scope.alreadyAnswered = false;
    $scope.lastQuestion = false;
    $scope.hasAnswer = false;
    $scope.page = parseInt($routeParams.qst) - 1;
    $scope.question = null;
    $scope.sel = {
        value : null
    }

    $scope.load = function () {

        $scope.isLoaded = false;
        $scope.alreadyAnswered = false;
        $scope.hasAnswer = false;
        $scope.question = null;
        $scope.sel = {
            value : null
        }

        Questions.get({
            participant : Global.participant._id,
            page : $scope.page
        }, function(data) {

            $scope.question = new Questions(data.question);

            if(data.lastPage) {
                $scope.lastQuestion = true;
            } else {
                $scope.page = data.page + 1;
            }

            if($scope.question.participantAnswer) {
                $scope.alreadyAnswered = true;
            }

            $scope.isLoaded = true;

        });
    };

    $scope.onSelection = function() {
        if($scope.sel.value) {
            //console.log($scope.sel.value);
            $scope.hasAnswer = true;
        } else {
            $scope.hasAnswer = false;
        }
    }

    $scope.end = function () {
    	console.info('Test started');
    	$location.path('/end');
    };

    $scope.update = function(cb) {
        if ($scope.sel.value && $scope.hasAnswer) {
            $scope.question.participantAnswer = $scope.sel.value
            console.log($scope.question.participantAnswer);
            $scope.question.$update(cb);
        }
    };

    $scope.next = function () {
        if($scope.alreadyAnswered) {
            $location.path('test/' + ($scope.page + 1));
        } else {
            $scope.update(function() {
                $location.path('test/' + ($scope.page + 1));
            });
        }
    };


}]);
