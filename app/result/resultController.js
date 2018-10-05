(function() {
	app.controller('ResultCtrl', ['$http',
		ResultController
	])

	function ResultController($http) {
		const vm = this;
		const POLLAPI = 'http://localhost:3000/api/poll/';

		vm.getResult = (key) => {
			$http.get(POLLAPI + 'key/' + key)
				.then(res => {
					console.log(res);
					vm.poll = res.data;
				})
				.catch(err => {
					console.log(err);
				});
		};

		console.log('Result Ctrl is FUCKING WORKING');
	}
}) ()