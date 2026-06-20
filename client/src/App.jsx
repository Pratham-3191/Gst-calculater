import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Trash2,
  CloudLightning,
  RefreshCw,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Sparkles,
  Info
} from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Toast from './components/Toast';
import { useCalculator } from './hooks/useCalculator';
import { formatCurrency, formatDate } from './utils/formatters';
import { GST_RATES } from './utils/calculations';

// FAQ data structure
const FAQ_ITEMS = [
  {
    question: "What is GST (Goods and Services Tax)?",
    answer: "GST is a comprehensive, multi-stage, destination-based indirect tax levied on the supply of goods and services in India. It consolidated numerous central and state taxes into a single unified tax system."
  },
  {
    question: "How are CGST and SGST split?",
    answer: "For transactions within the same state (intra-state), the GST amount is split equally between the Central Government (CGST - Central Goods and Services Tax) and the State Government (SGST - State Goods and Services Tax). For instance, an 18% GST rate is split into 9% CGST and 9% SGST."
  },
  {
    question: "What is Reverse GST (Removing GST)?",
    answer: "Reverse GST calculation is used to determine the original pre-tax price of an item when you only know the final price (which already includes GST). Our calculator automatically handles this when you switch to the 'Remove GST' mode."
  },
  {
    question: "What are the formulas used for GST calculation?",
    answer: "• Adding GST: GST Amount = (Base Amount × GST Rate) / 100; Total Amount = Base Amount + GST Amount.\n• Removing GST (Reverse): Base Amount = Total Amount / (1 + (GST Rate / 100)); GST Amount = Total Amount - Base Amount."
  }
];

function App() {
  const {
    mode,
    amount,
    gstRate,
    results,
    history,
    loading,
    historyLoading,
    error,
    setMode,
    setAmount,
    setGstRate,
    saveToHistory,
    fetchHistory,
    clearAll,
  } = useCalculator();

  const [toast, setToast] = useState({ show: false, message: '' });
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Fetch history on initial component mount
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleSave = async () => {
    const success = await saveToHistory();
    if (success) {
      setToast({ show: true, message: 'Calculation saved to history successfully!' });
      setTimeout(() => setToast({ show: false, message: '' }), 4000);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-indigo-500/30 selection:text-white relative">
      <Navbar />
      <Hero />

      {/* ── Calculator Section ── */}
      <section id="calculator" className="py-24 relative z-10 border-t border-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-medium mb-3">
              <Calculator className="w-3.5 h-3.5" />
              Live Computations
            </div>
            <h2 className="section-heading">
              GST <span className="gradient-text">Calculator</span>
            </h2>
            <p className="section-subheading">
              Select your mode, enter the amount, and get detailed CGST & SGST breakdowns in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Side: Inputs (7 cols on lg) */}
            <div className="lg:col-span-7 glass-card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Mode Selector Tab */}
                <div className="mb-8">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Calculation Mode
                  </label>
                  <div className="grid grid-cols-2 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                    <button
                      onClick={() => setMode('add')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${mode === 'add'
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                        }`}
                    >
                      <Plus className="w-4 h-4" />
                      Add GST
                    </button>
                    <button
                      onClick={() => setMode('remove')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${mode === 'remove'
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                        }`}
                    >
                      <Minus className="w-4 h-4" />
                      Remove GST
                    </button>
                  </div>
                </div>

                {/* Amount Input */}
                <div className="mb-8">
                  <label htmlFor="amount-input" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {mode === 'add' ? 'Base Amount (Excluding Tax)' : 'Total Amount (Including Tax)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-lg">
                      ₹
                    </span>
                    <input
                      type="number"
                      id="amount-input"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="input-field pl-9 text-lg"
                      min="0"
                      step="any"
                    />
                  </div>
                </div>

                {/* GST Slabs */}
                <div className="mb-8">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    GST Rate Slabs
                  </label>
                  <div className="grid grid-cols-5 gap-2 sm:gap-3">
                    {GST_RATES.map((rate) => (
                      <button
                        key={rate}
                        onClick={() => setGstRate(rate)}
                        className={`py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 border ${gstRate === rate
                          ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400 shadow-md shadow-indigo-500/5'
                          : 'bg-white/[0.02] border-white/[0.06] text-gray-400 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.04]'
                          }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom GST Input option */}
                {/* <div className="mb-8">
                  <label htmlFor="custom-gst" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Or Enter Custom GST Rate (%)
                  </label>
                  <input
                    type="number"
                    id="custom-gst"
                    value={GST_RATES.includes(gstRate) ? '' : gstRate}
                    onChange={(e) => {
                      const value = e.target.value === '' ? 18 : parseFloat(e.target.value);
                      setGstRate(isNaN(value) ? 0 : value);
                    }}
                    placeholder="Custom rate (e.g. 15)"
                    className="input-field text-sm"
                    min="0"
                    max="100"
                    step="any"
                  />
                </div> */}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/[0.04]">
                <button
                  onClick={clearAll}
                  disabled={!amount}
                  className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </button>
                <button
                  onClick={handleSave}
                  disabled={!results || loading}
                  className="btn-primary w-full sm:flex-1 flex items-center justify-center gap-2"
                >
                  <CloudLightning className={`w-4 h-4 ${loading ? 'animate-bounce' : ''}`} />
                  {loading ? 'Saving...' : 'Save to Cloud History'}
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-xs mt-3 text-center sm:text-left">{error}</p>
              )}
            </div>

            {/* Right Side: Live Results (5 cols on lg) */}
            <div className="lg:col-span-5 glass-card p-6 sm:p-8 bg-gradient-to-br from-indigo-950/20 to-violet-950/20 border-indigo-500/20 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl" />

              <div>
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Calculation Summary
                </h3>

                {results ? (
                  <div className="space-y-5">
                    {/* Primary Output Display */}
                    <div className="p-5 bg-white/[0.03] border border-white/[0.05] rounded-2xl mb-6">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                        {mode === 'add' ? 'Total Amount (With Tax)' : 'Base Amount (Before Tax)'}
                      </p>
                      <p className="text-3xl font-extrabold text-white tracking-tight">
                        {formatCurrency(mode === 'add' ? results.totalAmount : results.baseAmount)}
                      </p>
                    </div>

                    {/* Breakdown details */}
                    <div className="space-y-3.5 text-sm">
                      <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                        <span className="text-gray-400">Net Base Price</span>
                        <span className="font-semibold text-white">
                          {formatCurrency(results.baseAmount)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                        <span className="text-gray-400">CGST ({results.cgstRate}%)</span>
                        <span className="font-semibold text-indigo-300">
                          {formatCurrency(results.cgst)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                        <span className="text-gray-400">SGST ({results.sgstRate}%)</span>
                        <span className="font-semibold text-violet-300">
                          {formatCurrency(results.sgst)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                        <span className="text-gray-400">Total GST Tax ({results.gstRate}%)</span>
                        <span className="font-semibold text-fuchsia-300">
                          {formatCurrency(results.gstAmount)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-2.5">
                        <span className="text-gray-300 font-medium">Grand Total</span>
                        <span className="font-extrabold text-white text-lg">
                          {formatCurrency(results.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-gray-500 mb-4">
                      <Info className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-semibold text-gray-300">No Inputs Yet</p>
                    <p className="text-xs text-gray-500 max-w-[200px] mt-1.5">
                      Enter an amount to see the real-time GST tax breakdown.
                    </p>
                  </div>
                )}
              </div>

              {results && (
                <div className="mt-8 text-xs text-gray-500 flex items-start gap-2 bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.04]">
                  <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <p>
                    This is an intra-state calculation. GST is divided equally into CGST (Central) and SGST (State/UT).
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cloud History Section ── */}
      <section id="history" className="py-24 relative z-10 border-t border-white/[0.02] bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Calculation <span className="gradient-text">History</span>
              </h2>
              <p className="text-sm text-gray-400">
                Recent tax calculations stored in the database.
              </p>
            </div>
            <button
              onClick={fetchHistory}
              disabled={historyLoading}
              className="btn-secondary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${historyLoading ? 'animate-spin' : ''}`} />
              Refresh History
            </button>
          </div>

          {historyLoading && history.length === 0 ? (
            <div className="glass-card py-20 flex flex-col items-center justify-center text-center">
              <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin mb-4" />
              <p className="text-sm text-gray-400 font-medium">Fetching history from cloud database...</p>
            </div>
          ) : history.length > 0 ? (
            <div className="glass-card overflow-hidden border border-white/[0.06]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Type</th>
                      <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Base Amount</th>
                      <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">GST Rate</th>
                      <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Tax Amount</th>
                      <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Total Price</th>
                      <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Saved At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {history.map((item) => (
                      <tr key={item._id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="py-4.5 px-6 text-sm font-semibold">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${item.calculationType?.includes('Add')
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}>
                            {item.calculationType || 'GST Calc'}
                          </span>
                        </td>
                        <td className="py-4.5 px-6 text-sm text-white font-medium">
                          {formatCurrency(item.amount)}
                        </td>
                        <td className="py-4.5 px-6 text-sm text-indigo-300 font-bold">
                          {item.gstRate}%
                        </td>
                        <td className="py-4.5 px-6 text-sm text-fuchsia-300 font-medium">
                          {formatCurrency(item.gstAmount)}
                        </td>
                        <td className="py-4.5 px-6 text-sm text-white font-semibold">
                          {formatCurrency(item.totalAmount)}
                        </td>
                        <td className="py-4.5 px-6 text-xs text-gray-400 font-medium">
                          {formatDate(item.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="glass-card py-16 flex flex-col items-center justify-center text-center border border-dashed border-white/[0.08]">
              <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-gray-500 mb-4">
                <CloudLightning className="w-5 h-5 text-gray-600" />
              </div>
              <p className="text-sm font-semibold text-gray-300">No History Found</p>
              <p className="text-xs text-gray-500 max-w-sm mt-1.5">
                Saved calculations will appear here. Perform a calculation and click "Save to Cloud History" to persist it.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section id="faq" className="py-24 relative z-10 border-t border-white/[0.02]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-medium mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="section-heading">
              Tax <span className="gradient-text">Insights</span>
            </h2>
            <p className="section-subheading">
              Answers to standard questions regarding Goods & Services Tax (GST) rules and calculations.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card overflow-hidden border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-semibold text-white text-base sm:text-lg">
                    {faq.question}
                  </span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-indigo-400 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                  )}
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === idx ? 'max-h-64 border-t border-white/[0.04]' : 'max-h-0'
                    }`}
                >
                  <div className="py-5 px-6 text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 border-t border-white/[0.02] text-center relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} GST Calc. All rights reserved.</p>
          <p>
            Built for{' '}
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline hover:text-indigo-300 transition-colors font-medium"
            >
              Digital Heroes
            </a>
          </p>
        </div>
      </footer>

      {/* ── Notification Toast ── */}
      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ show: false, message: '' })}
      />
    </div>
  );
}

export default App;
