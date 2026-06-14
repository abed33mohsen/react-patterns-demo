import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AboutPage from '../components/AboutPage';
import CountersPage from '../components/Counters';
import HomePage from '../components/HomePage';
import Hooks from '../components/Hooks';
import LifeCyclePage from '../components/LifeCyclePage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PostDetails from '../components/PostDetails';
import ProfilePage from '../components/ProfilePage';
import ProtectedRoute from '../components/ProtectedRoute';
import PostsPage from '../components/Posts';
import RouterPage from '../components/RouterPage';
import SettingsPage from '../components/SettingsPage';
import ToDoPage from '../components/ToDoPage';
import TodoItemPage from '../components/TodoItemPage';
import { PATHS } from './paths';

export default function Router({ themePreference, activeTheme, onToggleTheme }) {
  return (
    <div className="app-main">
      <Routes>
        <Route path={PATHS.HOME} element={<HomePage />} />
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
        <Route
          path={PATHS.PROFILE}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATHS.SETTINGS}
          element={
            <ProtectedRoute>
              <SettingsPage
                themePreference={themePreference}
                activeTheme={activeTheme}
                onToggleTheme={onToggleTheme}
              />
            </ProtectedRoute>
          }
        />
        <Route path={PATHS.POSTS.ROOT} element={<PostsPage />} />
        <Route path={PATHS.POSTS.VIEW} element={<PostDetails />} />
        <Route path={PATHS.LIFECYCLE} element={<LifeCyclePage />} />
        <Route path={PATHS.ABOUT} element={<AboutPage />} />
        <Route path={PATHS.TODO} element={<ToDoPage />} />
        <Route path={PATHS.TODO_VIEW} element={<TodoItemPage />} />
        <Route path={PATHS.COUNTERS} element={<CountersPage />} />
        <Route path={PATHS.HOOKS} element={<Hooks />} />
        <Route path={PATHS.ROUTER} element={<RouterPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}
