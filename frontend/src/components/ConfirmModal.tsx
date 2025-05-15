interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm">
        {title && (
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        )}
        <p className="text-gray-200 mb-6">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-600 text-gray-200 hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
