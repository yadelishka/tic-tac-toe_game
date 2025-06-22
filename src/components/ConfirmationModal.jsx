export function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div>
      <div>
        <p>{message}</p>
        <button onClick={onConfirm}>Да</button>
        <button onClick={onCancel}>Нет</button>
      </div>
    </div>
  );
}
