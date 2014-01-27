'use strict';

angular.module('testApp.system').controller('IdeQCtrl', ['$scope', 'Global', '$location', 'Questions', function ($scope, Global, $location, Questions) {
    $scope.global = Global;

    $scope.question = null;

    $scope.init = function (question) {

        if( !question) {
            console.log('Question null.');
            return;
        }

        $scope.question = question;

        // console.info('../data/faces/' + $scope.question.original.url);

    };


}]);
