const express = require('express');
const router = express.Router();
const { withErrorHandling } = require('../errors');
const { getCurrentEvent } = require('../controllers/eventsControllers');

// get events
router.get('/', withErrorHandling(getCurrentEvent));

module.exports = router;