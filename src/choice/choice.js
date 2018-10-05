
const db = require('../../config/database');

class Choice {

	constructor(obj) {
		this.name = obj.name;
		this.votes = obj.votes ? obj.votes : 0;
		this.id_choice = obj.id_choice;
	};

	static addVote(id_choice) {
		if (!id_choice) return
		return new Promise( (resolve, reject) => {
			const query = `
			UPDATE choice 
			SET votes = votes + 1
			WHERE id_choice = ${id_choice}`;
			db.query(query, (err, results) => {
				if (err) reject(err);
				if (results.changedRows == 0) reject('Vote not found!');
				resolve(results);
			});
		});
	};

	static getChoicesByPoll(id_poll) {
		return new Promise( (resolve, reject) => {
			const query = `
			SELECT * FROM choice
			WHERE id_poll = '${id_poll}'
			`;
			db.query(query, (err, results) => {
				if (err) reject(err);
				resolve(Choice.createChoices(results));
			});
		});
	};

	static createChoices(array) {
		return array.map((el) => new Choice(el));
	}

	save(id_poll) {
		return new Promise( (resolve, reject) => {
			const query = `
			INSERT INTO choice (id_poll, votes, name) 
			VALUES ('${id_poll}', '${this.votes}', '${this.name}')`;
			db.query(query, (err, results) => {
				if (err) reject (err);
				resolve(results);
			});
		});
	}
	
}


module.exports = Choice;

