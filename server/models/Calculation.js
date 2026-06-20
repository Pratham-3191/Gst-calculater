const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema(
  {
    calculationType: {
      type: String,
      required: [true, 'Calculation type is required'],
      enum: {
        values: ['Add GST', 'Remove GST'],
        message: '{VALUE} is not a valid calculation type',
      },
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount must be a positive number'],
    },
    gstRate: {
      type: Number,
      required: [true, 'GST rate is required'],
      enum: {
        values: [3, 5, 12, 18, 28],
        message: '{VALUE} is not a valid GST rate',
      },
    },
    gstAmount: {
      type: Number,
      required: [true, 'GST amount is required'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for sorting by creation date (descending)
calculationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Calculation', calculationSchema);
