'use strict';

angular.module('adminApp.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
}]);