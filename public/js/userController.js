var app = angular.module('datingApp');

app.controller('UserController',
	['$scope', 'userService', function($scope, userService) {
        $scope.user = {};

        $scope.addUser = function() {
            var promise = userService.addUser($scope.user);
            promise.then(function(res) {
                alert('User is successfully created!');
            }, function(res){
                alert(res.data);
            })
        }

        userService.getUsers().then(function(response) {
            $scope.users = response.data;
        }, function(resp) {
            alert(resp.data);
        });
    }
]);