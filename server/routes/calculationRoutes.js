const express = require('express');
const router = express.Router();
const {
  saveCalculation,
  getCalculations,
} = require('../controllers/calculationController');

// POST /api/calculations - Save a calculation
// GET  /api/calculations - Fetch recent calculations
router.route('/').post(saveCalculation).get(getCalculations);

module.exports = router;
