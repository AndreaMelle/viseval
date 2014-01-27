'use strict';

angular.module('testApp.system').controller('RecQCtrl', ['$scope', 'Global', '$location', 'Questions', function ($scope, Global, $location, Questions) {
    $scope.global = Global;

    //$scope.question = null;

    $scope.init = function (question) {

        if( !question) {
            console.log('Question null.');
            return;
        }

        // @ TODO: setting image source, width and height should be performed in a directive!!!

        //$scope.question = question;
        
        $scope.src = {
            o : "../data/faces/" + question.original.url,
            q1 : "../data/faces/" + question.queries[0].image.url,
            q2 : "../data/faces/" + question.queries[1].image.url,
            q3 : "../data/faces/" + question.queries[2].image.url
        }



        // console.info();

    };


}]);
