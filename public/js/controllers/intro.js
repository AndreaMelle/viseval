'use strict';

angular.module('testApp.system').controller('IntroController', ['$scope', 'Global', '$location', function ($scope, Global, $location) {
    $scope.global = Global;

    $scope.start = function () {
    	console.info('Test started');
    	$location.path('/test');
    };


}]);
