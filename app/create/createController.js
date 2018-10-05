(function() {

	app.controller('CreateCtrl', ['$location', '$http',
		CreateController
		])

		function CreateController($location, $http) {

			const vm = this;
			const POLLAPI = 'http://localhost:3000/api/poll/';

			vm.choices = [{}];
			vm.created = false;

			vm.addChoice = (choice) => {
				if (!choice.name) return;
				vm.choices.push({});
				console.log(vm.choices);
			}

			vm.removeChoice = (index) => {
				if (vm.choices.length === 1) return;
				vm.choices.splice(index, 1);
			}

			vm.save = () => {
				const poll = buildPoll();

				$http.post(POLLAPI, poll)
					.then((result) => {
						vm.created = true;
						const createdPoll = result.data;
						vm.url = buildAccessLink(createdPoll.url);
						vm.key = createdPoll.key;
					})
					.catch(err => console.log(err));

			};

			function buildAccessLink(url) {
				return $location.host() + ':' + $location.port() + '/#' +'/url/' + url
			}

			function buildPoll() {
				if (!isTitleValid()) return;

				const poll = {
					title: vm.title,
					choices: vm.choices
						.filter((el) => el.name)
				};
				return poll;
			}

			function isTitleValid() {
				if (vm.title && vm.title != '')
					return true;

				return false;
			}

			console.log('Create Ctrl IS FUCKING WORKING');

		}


}) ()