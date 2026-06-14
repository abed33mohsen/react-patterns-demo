import { Link } from 'react-router-dom';
import './style.css';

export default function TodoItem({ id, title, completed, onToggle, onEdit, onDelete, todo }) {
  return (
    <div className={`todo-card${completed ? ' done' : ''}`}>
      <Link to={`/todo/${id}`} state={{ todo }} className="todo-link">
        <div className="todo-copy">
          <h3>{title}</h3>
          <span className={`todo-status${completed ? ' complete' : ''}`}>
            {completed ? 'Completed' : 'Pending'}
          </span>
        </div>
      </Link>
      <div className="todo-actions">
        <button type="button" className="todo-action-button" onClick={onToggle}>
          {completed ? 'Undo' : 'Complete'}
        </button>
        <button type="button" className="todo-action-button" onClick={onEdit}>
          Edit
        </button>
        <button type="button" className="todo-action-button danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
