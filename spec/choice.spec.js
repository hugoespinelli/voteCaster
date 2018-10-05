const Choice = require('../src/choice/choice');

describe("Choice tester", () => {

	beforeEach(() => {
	});


	describe('Testing votes', () => {

		it("should return 0 votes when passing no votes on constructor", () => {
			let choiceObj = {
				name: 'Gato',
				id_choice: 1
			};
			let choice = new Choice(choiceObj);
			expect(choice.votes).toBe(0);
		});

		it("should return 2 votes when passing votes on constructor", () => {
			let choiceObj = {
				name: 'Gato',
				votes: 2,
				id_choice: 1
			};
			let choice = new Choice(choiceObj);
			expect(choice.votes).toBe(2);
		});

	});

	describe('Static Methods', () => {
		it("should be able to create choice objects", () => {
			let choicesArrayObjs = [
				{
					name: 'Gato',
					votes: 2,
					id_choice: 1
				},
				{
					name: 'Cachorro',
					votes: 0,
					id_choice: 1
				},
			]
			let choices = Choice.createChoices(choicesArrayObjs)
			choices.forEach((el) => expect(el).toEqual(jasmine.any(Choice)));	
		});
	});

});
