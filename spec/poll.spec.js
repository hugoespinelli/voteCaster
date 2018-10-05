const Poll = require('../src/poll/poll');
const moment = require('moment');
const Choice = require('../src/choice/choice');


describe("Poll tester", () => {

	let poll

	beforeEach(() => {
		let choices = [];
		let title = "My favorite animal is:"
		choices.push(new Choice({name: "Cat"}));
		choices.push(new Choice({name: "Dog"}));
		poll = new Poll(title,choices);
	});

	describe("Expiration date tester", () => {
		
		it("should generate 1 day of expiration", () => {
			const actual = moment(Date.now());
			expect(poll.expirationDate).toEqual(actual.add(1, 'day'));
		});

		it("should return false if not expired", () => {
			expect(poll.isDateExpired()).toBeFalsy();
		});

		it("should return true if expired", () => {
			const actual = moment(Date.now());
			const expiredDate = actual.subtract(3, 'days');
			poll.expirationDate = expiredDate;
			expect(poll.isDateExpired()).toBeTruthy();
		});
	});

	describe("Url tester", () => {

		it("should generate a random link url", () => {
			expect(poll.url).toBeDefined();
		});

		it("should return a defined link url", () => {
			const pollObj = { title: 'test', url: 'dwqdqw'};
			let newPoll = new Poll(pollObj);
			expect(newPoll.url).toBe('dwqdqw');
		});
	});

	describe("Access Key tester", () => {

		it("should generate a random access key", () => {
			expect(poll.key).toBeDefined();
		});

		it("should return a defined access ey", () => {
			const pollObj = { title: 'test', access_key: 'dwqdqw'};
			let newPoll = new Poll(pollObj);
			expect(newPoll.key).toBe('dwqdqw');
		});

	});

	describe("Choice insert tester", () => {

		it("should to be defined on construction", () => {
			expect(poll.choices).toBeDefined();
		});

		it("should return length of 2 choices", () => {
			expect(poll.choices.length).toBe(2);
		});

		it("should return Cat", () => {
			let choices = poll.choices;
			expect(choices[0].name).toBe("Cat");
		});

	});


});
