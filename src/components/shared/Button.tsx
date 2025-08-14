import { PropsWithChildren } from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  disabled = false,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={disabled ? "button disabled-btn" : "button"}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
