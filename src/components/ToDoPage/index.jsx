import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataState from '../DataState';
import TodoItem from '../TodoItem';
import ToastMessage from '../ToastMessage';
import { useTodosContext } from '../../context/TodosContext';
import useTimedMessage from '../../hooks/useTimedMessage';
import { PATHS } from '../../router/paths';
import './style.css';

export default function ToDoPage() {
  const { todos, createTodo, updateTodo, deleteTodo, toggleTodo } = useTodosContext();
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortValue, setSortValue] = useState('latest');
  const { message, setMessage } = useTimedMessage();
  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;
  const completionRate = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  const handleAddTodo = () => {
    const trimmed = newTodo.trim();

    if (!trimmed) {
      return;
    }

    if (editingId) {
      updateTodo(editingId, { title: trimmed });
      setMessage('Todo updated successfully.');
      setEditingId(null);
    } else {
      createTodo(trimmed);
      setMessage('Todo added successfully.');
    }

    setNewTodo('');
  };

  const handleEditTodo = (todo) => {
    setEditingId(todo.id);
    setNewTodo(todo.title);
  };

  const handleDeleteTodo = (todoId) => {
    const isConfirmed = window.confirm('Delete this todo permanently?');

    if (!isConfirmed) {
      return;
    }

    deleteTodo(todoId);
    setMessage('Todo deleted successfully.');
  };

  const handleToggleTodo = (todo) => {
    toggleTodo(todo.id);
    setMessage(todo.completed ? 'Todo marked as pending.' : 'Todo marked as completed.');
  };

  const visibleTodos = todos
    .filter((todo) => {
      const matchesSearch = todo.title.toLowerCase().includes(searchValue.trim().toLowerCase());
      const matchesStatus =
        statusFilter === 'all' ? true :
        statusFilter === 'completed' ? todo.completed :
        !todo.completed;

      return matchesSearch && matchesStatus;
    })
    .sort((firstTodo, secondTodo) => {
      if (sortValue === 'alphabetical') {
        return firstTodo.title.localeCompare(secondTodo.title);
      }

      if (sortValue === 'completed') {
        return Number(secondTodo.completed) - Number(firstTodo.completed);
      }

      return Number(secondTodo.id) - Number(firstTodo.id);
    });

  const resetFilters = () => {
    setSearchValue('');
    setStatusFilter('all');
    setSortValue('latest');
  };

  return (
    <main className="todo-page">
      <section className="todo-hero ui-card">
        <div className="todo-hero-copy">
          <p className="todo-kicker">Task Workspace</p>
          <h1>Organize your daily tasks with more clarity</h1>
          <p className="todo-text">
            Add, review, and update tasks quickly, then jump to the details page when you want to focus on a single item.
          </p>
          <div className="todo-hero-actions">
            <button type="button" className="ui-button ui-button--primary" onClick={() => document.querySelector('.todo-form input')?.focus()}>
              Add New Task
            </button>
            <Link to={PATHS.HOME} className="ui-link-button ui-link-button--ghost">
              Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="todo-stats">
          <div className="todo-stat-card">
            <strong>{todos.length}</strong>
            <span>Total Tasks</span>
          </div>
          <div className="todo-stat-card">
            <strong>{pendingCount}</strong>
            <span>Pending</span>
          </div>
          <div className="todo-stat-card accent">
            <strong>{completionRate}%</strong>
            <span>Completion Rate</span>
          </div>
        </div>
      </section>

      <section className="todo-panel ui-card">
        <ToastMessage message={message} />
        <div className="todo-panel-head">
          <div>
            <p className="todo-kicker">To Do</p>
            <h2>Task Manager</h2>
            <p className="todo-text">Add, edit, toggle, and delete tasks, then open each item in its details page.</p>
          </div>
          <span className="todo-results-count">{visibleTodos.length} tasks visible</span>
        </div>

        <div className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="Write a new task..."
          />
          <button type="button" className="ui-button ui-button--primary" onClick={handleAddTodo}>
            {editingId ? 'Save Todo' : 'Add Todo'}
          </button>
          {editingId ? (
            <button type="button" className="ui-button ui-button--secondary" onClick={() => {
              setEditingId(null);
              setNewTodo('');
            }}>
              Cancel
            </button>
          ) : null}
        </div>

        <div className="todo-controls">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="all">All status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select value={sortValue} onChange={(event) => setSortValue(event.target.value)}>
            <option value="latest">Latest first</option>
            <option value="alphabetical">Title A-Z</option>
            <option value="completed">Completed first</option>
          </select>
          <button type="button" className="ui-button ui-button--secondary todo-clear-button" onClick={resetFilters}>
            Clear Filters
          </button>
        </div>

        <div className="todo-grid">
          {visibleTodos.length > 0 ? (
            visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
                todo={todo}
                onToggle={() => handleToggleTodo(todo)}
                onEdit={() => handleEditTodo(todo)}
                onDelete={() => handleDeleteTodo(todo.id)}
              />
            ))
          ) : (
            <div className="todo-empty-state">
              <DataState
                variant="empty"
                title="No tasks match these filters"
                message="Try changing the search term or reset the filters to show all tasks again."
                actionLabel="Reset Filters"
                onAction={resetFilters}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
