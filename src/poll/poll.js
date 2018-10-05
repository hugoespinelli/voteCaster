const moment = require('moment');
const uuidv4 = require('uuid/v4');
const db = require('../../config/database');
const _ = require('lodash');
const Choice = require('../choice/choice');

class Poll {

	constructor(obj, choices = []) {
		this.title = obj.title;
		this.expirationDate = obj.date_expiration ? obj.date_expiration : this.makeExpirationDate();
		this.url = obj.url ? obj.url : this.generateUrl();
		this.key = obj.access_key ? obj.access_key : this.generateAccessKey();
		this.choices = choices;
	};

	static getPollByURL(url) {
		return new Promise((resolve, reject) => {
			const query = `SELECT * FROM poll p
			WHERE url = '${url}'`;
			db.query(query, (err, results) => {
				if (err) reject (err);
				if (results.length == 0) return reject('Poll not found');
				const id_poll = results[0].id_poll;
				const poll = new Poll(results[0]);
				if (poll.isDateExpired()) return reject('Poll time expired');
				Choice.getChoicesByPoll(id_poll)
					.then((choices) => {
						poll.setChoices(choices);
						return resolve(poll);
					})
					.catch((err) => reject(err))
			});
		});
	};

	static getIdPollByURL(url) {
		return new Promise((resolve, reject) => {
			const query = `SELECT p.id_poll FROM poll p
			WHERE url = '${url}'`;

			db.query(query, (err, results) => {
				if (err) reject(err);
				if (results.length == 0) resolve(null)
				return resolve(results[0])
			});
		});

	};

	static getPollByKey(key) {
		return new Promise((resolve, reject) => {
			const query = `SELECT * FROM poll 
			WHERE access_key = '${key}'`;
			db.query(query, (err, results) => {
				if (err) reject (err);
				if (results.length == 0) return reject('Poll not found');
				const { id_poll } = results[0];
				const poll = new Poll(results[0]);
				Choice.getChoicesByPoll(id_poll)
					.then((choices) => {
						poll.setChoices(choices);
						return resolve(poll);
					})
					.catch((err) => reject(err))
			});
		});
	};

	makeExpirationDate() {
		const actualTime = moment(Date.now());
		const expiration = actualTime.add(1, 'day');
		return expiration;
	};

	isDateExpired() {
		// const actualTime = moment(Date.now());
		// if (actualTime > this.expirationDate)
		// 	return true;
		return false;
	}

	setExpirationDate(date) {
		this.expirationDate = date;
	}

	generateUrl() {
		return uuidv4();
	}

	generateAccessKey() {
		return uuidv4();
	}

	setChoices(choices) {
		this.choices = choices
	}

	save() {
		return new Promise( (resolve, reject) => {
			const query = `
				INSERT INTO poll (date_expiration, url, access_key, title) 
				VALUES (
				'${this.expirationDate.format("YYYY-MM-DD hh:mm:ss")}', 
				'${this.url}', '${this.key}', '${this.title}');`;

			db.query(query, (err, result) => {
				if (err) reject (err);
				console.log(result);
				let { insertId } = result;
				this.saveChoices(insertId)
					.then(() => resolve())
					.catch((err) => reject(err))
			});
		});

	}

	saveChoices(insertedId) {
		let promises = [];
		_.forEach(this.choices, (choice) => {
			promises.push(choice.save(insertedId))
		});
		return Promise.all(promises);
	}

}

module.exports = Poll;

