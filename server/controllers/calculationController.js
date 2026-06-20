const Calculation = require('../models/Calculation');

/**
 * @desc    Save a new calculation to the database
 * @route   POST /api/calculations
 * @access  Public
 */
const saveCalculation = async (req, res, next) => {
  try {
    const { calculationType, amount, gstRate, gstAmount, totalAmount } = req.body;

    // Manual validation for clear error messages
    if (!calculationType || amount == null || !gstRate || gstAmount == null || totalAmount == null) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: calculationType, amount, gstRate, gstAmount, totalAmount',
      });
    }

    if (!['Add GST', 'Remove GST'].includes(calculationType)) {
      return res.status(400).json({
        success: false,
        message: 'calculationType must be either "Add GST" or "Remove GST"',
      });
    }

    if (![3, 5, 12, 18, 28].includes(Number(gstRate))) {
      return res.status(400).json({
        success: false,
        message: 'gstRate must be one of: 3, 5, 12, 18, 28',
      });
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount < 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a valid positive number',
      });
    }

    const numGstAmount = Number(gstAmount);
    const numTotalAmount = Number(totalAmount);
    if (isNaN(numGstAmount) || isNaN(numTotalAmount)) {
      return res.status(400).json({
        success: false,
        message: 'gstAmount and totalAmount must be valid numbers',
      });
    }

    const calculation = await Calculation.create({
      calculationType,
      amount: numAmount,
      gstRate: Number(gstRate),
      gstAmount: numGstAmount,
      totalAmount: numTotalAmount,
    });

    res.status(201).json({
      success: true,
      data: calculation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch recent calculations from the database
 * @route   GET /api/calculations
 * @access  Public
 */
const getCalculations = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);

    const calculations = await Calculation.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      count: calculations.length,
      data: calculations,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { saveCalculation, getCalculations };
