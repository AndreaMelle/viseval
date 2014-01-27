'use strict';

//Setting up route
angular.module('adminApp').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'views/admin.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

angular.module('testApp').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: '../views/intro.html'
        }).
        when('/test', {
            redirectTo: '/test/1'
        }).
        when('/test/:qst', {
            templateUrl: '../views/test.html'
        }).
        when('/end', {
            templateUrl: '../views/end.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('adminApp').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

angular.module('testApp').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);