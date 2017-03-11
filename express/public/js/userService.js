var app = angular.module('datingApp', []);

app.factory('userService',
	['$http', function($http) {
		return {
			addUser: function(user) {
                return $http.post('/users', user);
			},

            getUsers: function() {
                return $http.get('/users');   
            }
		};
	}
]);