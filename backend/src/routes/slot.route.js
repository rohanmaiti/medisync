const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slot.controller');

router.get('/details', slotController.getSlotDetails);

module.exports = router;
