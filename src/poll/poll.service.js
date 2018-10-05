
const express = require('express');

const Poll = require('./poll');
const Choice = require('../choice/choice');

const router = express.Router();


// router: poll/:url
router.get('/:url', (req, res) => {

	const url = req.params.url;
	if (!url) return res.status(404).send('url not found!');

	Poll.getPollByURL(url)
		.then((resp) => {
			if (!resp) return res.status(404).send('url not found!');
			return res.status(200).send(resp);
		})
		.catch((err) => {
			return res.status(500).send(err);
		});

});

router.post('/', (req, res) => {

	const body = req.body;

	if (!body.title) return res.status(404).send('Title cant be empty!');

	if (!body.choices || body.choices.length == 0) return res.status(404).send('Choices cant be empty!');
	
	let choices = Choice.createChoices(body.choices);

	let poll = new Poll(body, choices);
	poll.save()
		.then(() => {
			return res.status(200).send(poll);
		})
		.catch((error) => {
			return res.status(500).send(error);
		});
});

router.get('/key/:key', (req, res) => {

	const key = req.params.key;
	if (!key) return res.status(404).send('key not found!');

	Poll.getPollByKey(key)
		.then((poll) => {
			return res.status(200).send(poll);
		})
		.catch((err) => {
			return res.status(500).send(err);
		});


});

module.exports = router;

