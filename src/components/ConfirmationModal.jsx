export function ConfirmationModal({
  message,
  onConfirm,
  onCancel,
  modalClassNameVisible = "",
  modalClassName = "",
  buttonClassName = "",
  overlayClassName = "",
  showConfirmation,
}) {
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
