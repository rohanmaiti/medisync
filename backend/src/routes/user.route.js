const express = require('express');
const router = express.Router();
const slotController = require('../controllers/user.controller');

router.post('/book', slotController.bookSlot);
router.get('/hospitals', slotController.getHospitals);
router.get('/departments/:hospitalId', slotController.getDepartmentsByHospital);

module.exports = router;
