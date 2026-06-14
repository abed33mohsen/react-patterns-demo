import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import TODOS from '../mock/todos';

const TodosContext = createContext(null);
const TODOS_STORAGE_KEY = 'alara-react-todos';

function getInitialTodos() {
  if (typeof window === 'undefined') {
    return TODOS;
  }

  try {
    const storedTodos = window.localStorage.getItem(TODOS_STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : TODOS;
  } catch {
    return TODOS;
  }
}

export function TodosProvider({ children }) {
  const [todos, setTodos] = useState(getInitialTodos);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const createTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    return newTodo;
  };

  const updateTodo = (id, updates) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        String(todo.id) === String(id)
          ? { ...todo, ...updates }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => String(todo.id) !== String(id)));
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        String(todo.id) === String(id)
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const getTodoById = (id) => todos.find((todo) => String(todo.id) === String(id)) || null;

  const value = useMemo(
    () => ({
      todos,
      createTodo,
      updateTodo,
      deleteTodo,
      toggleTodo,
      getTodoById,
    }),
    [todos]
  );

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
}

export function useTodosContext() {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodosContext must be used within TodosProvider');
  }

  return context;
}
