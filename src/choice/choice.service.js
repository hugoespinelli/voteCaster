
const express = require('express');

const Choice = require('./choice');

const router = express.Router();

// router: choice/:id_choice
router.put('/:id_choice', (req, res) => {

	const id_choice = req.params.id_choice;
	if (!id_choice) return res.status(404).send('id not found!');

	Choice.addVote(id_choice)
		.then(() => res.status(200).send('Vote done!'))
		.catch((err) => res.status(500).send(err));

});

module.exports = router;

