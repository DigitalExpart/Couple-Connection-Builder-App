import { X, AlertTriangle } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  scanName: string;
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, scanName }: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-[slideUp_0.3s_ease-out] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Warning icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-lg">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-gray-900 mb-2">
          Delete Scan?
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 mb-8 leading-relaxed">
          Are you sure you want to delete the scan for <span className="text-gray-900">{scanName}</span>? This action cannot be undone.
        </p>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
