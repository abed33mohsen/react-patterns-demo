import './style.css';

export default function ToastMessage({ message, variant = 'success' }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`toast-message toast-message--${variant}`}>
      <span className="toast-message-dot" />
      <p>{message}</p>
    </div>
  );
}
