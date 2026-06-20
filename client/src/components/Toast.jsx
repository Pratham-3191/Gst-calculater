import { CheckCircle, X } from 'lucide-react';

/**
 * Toast notification – appears at the bottom-right corner.
 * Auto-hides after a timeout set by the parent.
 */
const Toast = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slide-up" id="toast">
      <div className="flex items-center gap-3 px-5 py-3.5 bg-gray-900/90 border border-emerald-500/20 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-emerald-500/10">
        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <span className="text-sm font-medium text-emerald-200">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 p-0.5 text-gray-500 hover:text-white rounded transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
