import { AlertTriangle, X, Info, Sparkles } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'warning' | 'danger' | 'info';
}

export function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'warning',
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const getVariantConfig = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: AlertTriangle,
          iconColor: 'text-red-600',
          iconBg: 'bg-red-100',
          button: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          iconColor: 'text-amber-600',
          iconBg: 'bg-amber-100',
          button: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
        };
      case 'info':
        return {
          icon: Sparkles,
          iconColor: 'text-blue-600',
          iconBg: 'bg-gradient-to-br from-blue-100 to-purple-100',
          button: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
        };
    }
  };

  const config = getVariantConfig();
  const IconComponent = config.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 animate-[fadeIn_0.2s_ease-out]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full animate-[slideUp_0.3s_ease-out]">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all z-10"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        <div className="p-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 ${config.iconBg} rounded-2xl flex items-center justify-center`}>
              <IconComponent className={`w-8 h-8 ${config.iconColor}`} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl text-gray-900 text-center mb-3">{title}</h2>

          {/* Message */}
          <p className="text-gray-600 text-center leading-relaxed mb-6">
            {message}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 py-4 text-white rounded-2xl transition-all shadow-lg ${config.button}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}