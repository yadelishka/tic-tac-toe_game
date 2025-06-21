export function Button({ children, onClick, disabled, disabledClassName }) {
  return (
    <button
      className={disabledClassName ? "button disabled-btn" : "button"}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
