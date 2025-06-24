export function ConfirmationModal({
  message,
  onConfirm,
  onCancel,
  modalClassName = "",
  buttonClassName = "",
}) {
  return (
    <div>
      <div className={`${modalClassName}`}>
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
