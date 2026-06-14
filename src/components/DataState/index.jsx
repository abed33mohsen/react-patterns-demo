import { Link } from 'react-router-dom';
import './style.css';

export default function DataState({
  variant = 'loading',
  title,
  message,
  actionLabel,
  actionTo,
  onAction,
}) {
  const resolvedTitle = title || (
    variant === 'error' ? 'Something went wrong' :
    variant === 'empty' ? 'No data found' :
    'Loading...'
  );

  return (
    <section className={`data-state data-state--${variant} ui-card`}>
      {variant === 'loading' && <span className="data-state-spinner" />}
      {variant === 'error' && <span className="data-state-icon">!</span>}
      {variant === 'empty' && <span className="data-state-icon">0</span>}

      <h2>{resolvedTitle}</h2>
      {message ? <p>{message}</p> : null}

      {actionTo && actionLabel ? (
        <Link to={actionTo} className="ui-link-button ui-link-button--primary data-state-action">
          {actionLabel}
        </Link>
      ) : null}

      {!actionTo && onAction && actionLabel ? (
        <button type="button" onClick={onAction} className="ui-button ui-button--primary data-state-action">
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}
