interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  modalClassNameVisible?: string;
  modalClassName?: string;
  buttonClassName?: string;
  overlayClassName?: string;
  showConfirmation: boolean;
}

export function ConfirmationModal({
  message,
  onConfirm,
  onCancel,
  modalClassNameVisible = "",
  modalClassName = "",
  buttonClassName = "",
  overlayClassName = "",
  showConfirmation,
}: ConfirmationModalProps) {
  return (
    <div>
      <div
        className={showConfirmation ? `${overlayClassName}` : ""}
        onClick={onCancel}
      />

      <div
        className={
          showConfirmation
            ? `${modalClassNameVisible} ${modalClassName}`
            : `${modalClassName}`
        }
      >
        <p>{message}</p>
        <div>
          <button onClick={onConfirm} className={`${buttonClassName}`}>
            Да
          </button>
          <button onClick={onCancel} className={`${buttonClassName}`}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}
