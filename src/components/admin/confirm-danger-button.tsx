"use client";

export function ConfirmDangerButton({
  children,
  firstMessage,
  secondMessage,
  className = "btn-danger",
}: {
  children: React.ReactNode;
  firstMessage: string;
  secondMessage: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(event) => {
        if (!window.confirm(firstMessage) || !window.confirm(secondMessage)) {
          event.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
