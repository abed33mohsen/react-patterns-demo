import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ToastMessage from '../ToastMessage';
import { useTodosContext } from '../../context/TodosContext';
import useTimedMessage from '../../hooks/useTimedMessage';
import './style.css';

export default function TodoItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { getTodoById, updateTodo, deleteTodo, toggleTodo } = useTodosContext();
  const todo = location.state?.todo || getTodoById(id);
  const [title, setTitle] = useState(todo?.title || '');
  const { message, setMessage } = useTimedMessage();

  return (
    <main className="todo-item-page">
      <section className="todo-item-card">
        <ToastMessage message={message} />
        <p className="todo-item-kicker">Todo Details</p>
        {todo ? (
          <>
            <h1>{todo.title}</h1>
            <p className="todo-item-text">Status: {todo.completed ? 'Completed' : 'Pending'}</p>
            <p className="todo-item-text">
              This page is connected through route params using <code>useParams</code>.
            </p>
            <div className="todo-item-badge-row">
              <span className={`todo-item-badge${todo.completed ? ' complete' : ''}`}>
                {todo.completed ? 'Completed Task' : 'Pending Task'}
              </span>
            </div>
            <div className="todo-item-form">
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Edit todo title" />
              <button
                type="button"
                className="todo-item-button"
                onClick={() => {
                  updateTodo(todo.id, { title: title.trim() || todo.title });
                  setMessage('Todo title updated successfully.');
                }}
              >
                Save Title
              </button>
            </div>
            <div className="todo-item-actions">
              <button type="button" className="todo-item-button secondary" onClick={() => {
                toggleTodo(todo.id);
                setMessage(todo.completed ? 'Todo marked as pending.' : 'Todo marked as completed.');
              }}>
                {todo.completed ? 'Mark Pending' : 'Mark Completed'}
              </button>
              <button type="button" className="todo-item-button danger" onClick={() => {
                const isConfirmed = window.confirm('Delete this todo permanently?');

                if (!isConfirmed) {
                  return;
                }

                deleteTodo(todo.id);
                navigate('/todo');
              }}>
                Delete Todo
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>Todo item not found.</h1>
            <p className="todo-item-text">The requested task could not be found in the local list.</p>
          </>
        )}

        <button type="button" className="todo-item-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </section>
    </main>
  );
}
