
const express = require('express');

const router = express.Router();

const pollApi = require('./poll/poll.service');
const choiceApi = require('./choice/choice.service');

router.use('/poll', pollApi);
router.use('/choice', choiceApi);

module.exports = router;

