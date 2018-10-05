(function() {

	app.controller('PollCtrl', ['$location', '$http',
		PollController
		])

	function PollController($location, $http) {
		const vm = this;
		const POLLAPI = 'http://localhost:3000/api/poll/';
		const CHOICEAPI = 'http://localhost:3000/api/choice/';

		vm.voted = false;
		
		vm.getUrl = () => {
			return $location.path().substr(4);
		};

		vm.getPoll = (url) => {
			$http.get(POLLAPI + url)
				.then((res) => {
					const {title, choices} = res.data;
					vm.title = title;
					vm.choices = choices;
				})
				.catch(err => {
					$location.path('/');
				})
		}


		vm.vote = (answer) => {
			if(!answer) return;
			const {id_choice} = answer;
			$http.put(CHOICEAPI + id_choice)
				.then((res) => {
					vm.voted = true;
				})
				.catch(err => {
					console.log(err);
				})
		}

		vm.getPoll(vm.getUrl());

		console.log('Poll Controler is FCKING WORKING!!');

	}

 }) ()