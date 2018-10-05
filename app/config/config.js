
app.config(['$routeProvider', '$locationProvider' , function ($routeProvider, $locationProvider) {

	$routeProvider
		.when('/', {
				templateUrl: 'result/result.html',
				controller: 'ResultCtrl'
		})
		.when('/url/:url', {
			templateUrl: 'poll/poll.html',
			controller: 'PollCtrl'
		})
		.when('/create', {
			templateUrl: 'create/create.html',
			controller: 'CreateCtrl'
		})


	$locationProvider.hashPrefix('');

}]);

