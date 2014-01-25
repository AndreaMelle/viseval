'use strict';

angular.module('adminApp.system').controller('AdminController', ['$scope', 'Global', 'Participants', 'Questions', 'ngTableParams', function ($scope, Global, Participants, Questions, ngTableParams) {
    
    $scope.global = Global;
    $scope.data = [];
    $scope.numSelected = 0;

    $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10,
    }, {
        total: $scope.data.length,
        getData: function ($defer, params) {
            params.total($scope.data.length);
            $defer.resolve($scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.changeSelection = function(sel) {
    	if (sel.$selected) {
    		$scope.numSelected += 1;
    	} else {
    		$scope.numSelected -= 1;
    	}
    };

    
    $scope.remove = function() {

        var toRemove = [];

    	for(var i = 0; i <$scope.data.length; i++) {
            var p = $scope.data[i];
            if (p.hasOwnProperty('$selected') && p.$selected === true) {
                toRemove.push(p);
            }
        }

        var iterator = function (p, cb) {
            var question = new Questions();
            question.$remove({participant : p._id}, function() {
                var i = $scope.data.indexOf(p);
                p.$remove(function(response) {
                    $scope.data.splice(i,1);
                    cb(null);
                });
            });
        }
    	
        async.forEach(toRemove, iterator, function () {});
        
        // @TODO: is something goes bad with participant or question creation, then the status is uncertain
    };

    $scope.create = function() {
        var email = prompt("Please enter participant email","");

        if (email) {
            var participant = new Participants({});
            participant.email = email;

            // @TODO: is something goes bad with question creation, the participant is created anyway. We should remove it
            participant.$save(function(p) {
                var question = new Questions();
                question.$save({participant : p._id}, function() {
                    $scope.data.push(p);    
                }, function(err) {
                    console.log(err);
                    participant.$remove();
                });
            });
                
        }
    };
	

	$scope.get = function() {
        Participants.query(function (data) {
            $scope.data = data;
        });
    };    

}]);