/**
 * Pure calculation functions for GST operations.
 * No side effects – safe for use in hooks and components.
 */

/**
 * Add GST to a base amount.
 *
 * @param {number} baseAmount - Price before tax
 * @param {number} gstRate    - GST percentage (e.g. 18)
 * @returns {object} Calculation result with all breakdowns
 */
export const addGST = (baseAmount, gstRate) => {
  const gstAmount = (baseAmount * gstRate) / 100;
  const totalAmount = baseAmount + gstAmount;
  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  return {
    baseAmount,
    gstRate,
    gstAmount,
    totalAmount,
    cgst,
    sgst,
    cgstRate: gstRate / 2,
    sgstRate: gstRate / 2,
  };
};

/**
 * Remove GST from a total amount (reverse calculation).
 *
 * @param {number} totalAmountWithGST - Price including GST
 * @param {number} gstRate            - GST percentage (e.g. 18)
 * @returns {object} Calculation result with all breakdowns
 */
export const removeGST = (totalAmountWithGST, gstRate) => {
  const originalAmount = totalAmountWithGST / (1 + gstRate / 100);
  const gstAmount = totalAmountWithGST - originalAmount;
  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  return {
    baseAmount: originalAmount,
    gstRate,
    gstAmount,
    totalAmount: totalAmountWithGST,
    cgst,
    sgst,
    cgstRate: gstRate / 2,
    sgstRate: gstRate / 2,
  };
};

/** Available GST rate slabs */
export const GST_RATES = [3, 5, 12, 18, 28];
