import { useState, useCallback, useEffect } from 'react';
import { addGST, removeGST } from '../utils/calculations';
import { saveCalculation, getCalculations } from '../services/api';

/**
 * Custom hook encapsulating all calculator state and business logic.
 * Provides real-time calculation, history persistence, and error handling.
 */
export const useCalculator = () => {
  // ── State ──────────────────────────────────────────────
  const [mode, setMode] = useState('add');        // 'add' | 'remove'
  const [amount, setAmount] = useState('');        // string to allow empty input
  const [gstRate, setGstRate] = useState(18);      // default 18%
  const [results, setResults] = useState(null);    // calculation results object
  const [history, setHistory] = useState([]);      // saved calculations array
  const [loading, setLoading] = useState(false);   // save-in-progress flag
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError] = useState('');

  // ── Real-time Calculation ──────────────────────────────
  const calculate = useCallback(() => {
    const numAmount = parseFloat(amount);

    // Guard: empty, NaN, or negative → clear results
    if (!amount || isNaN(numAmount) || numAmount < 0) {
      setResults(null);
      return;
    }

    if (numAmount === 0) {
      setResults(null);
      return;
    }

    const result = mode === 'add'
      ? addGST(numAmount, gstRate)
      : removeGST(numAmount, gstRate);

    setResults(result);
  }, [amount, gstRate, mode]);

  // Re-calculate whenever inputs change
  useEffect(() => {
    calculate();
  }, [calculate]);

  // ── Persist to MongoDB ─────────────────────────────────
  const saveToHistory = async () => {
    if (!results) return false;

    try {
      setLoading(true);
      setError('');

      await saveCalculation({
        calculationType: mode === 'add' ? 'Add GST' : 'Remove GST',
        amount: parseFloat(amount),
        gstRate,
        gstAmount: results.gstAmount,
        totalAmount: results.totalAmount,
      });

      // Refresh history after saving
      await fetchHistory();
      return true;
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to save calculation. Please try again.';
      setError(message);
      console.error('Save error:', message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ── Fetch History ──────────────────────────────────────
  const fetchHistory = useCallback(async () => {
    try {
      setHistoryLoading(true);
      setError('');
      const data = await getCalculations();
      setHistory(data);
    } catch (err) {
      // Fail silently – history is non-critical
      console.error('Fetch history error:', err.message);
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  // ── Clear / Reset ──────────────────────────────────────
  const clearAll = () => {
    setAmount('');
    setResults(null);
    setError('');
  };

  // ── Public API ─────────────────────────────────────────
  return {
    // State
    mode,
    amount,
    gstRate,
    results,
    history,
    loading,
    historyLoading,
    error,

    // Actions
    setMode,
    setAmount,
    setGstRate,
    saveToHistory,
    fetchHistory,
    clearAll,
  };
};
