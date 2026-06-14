import { useEffect, useState } from 'react';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import Router from './router/index.jsx';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { PostsProvider } from './context/PostsContext';
import { TodosProvider } from './context/TodosContext';
import { UISettingsProvider, useUISettingsContext } from './context/UISettingsContext';
import UserContext from './context/UserContext';
import './App.css';

const THEME_STORAGE_KEY = 'alara-flow-theme';
const THEME_OPTIONS = ['light', 'dark', 'system'];

const getSystemTheme = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'system';
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (THEME_OPTIONS.includes(savedTheme)) {
    return savedTheme;
  }

  return 'system';
};

export default function App() {
  return (
    <AuthProvider>
      <UISettingsProvider>
        <AppShell />
      </UISettingsProvider>
    </AuthProvider>
  );
}

function AppShell() {
  const { user } = useAuthContext();
  const { settings } = useUISettingsContext();
  const [themePreference, setThemePreference] = useState(getInitialTheme);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  const activeTheme = themePreference === 'system' ? systemTheme : themePreference;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (event) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = activeTheme;
    document.documentElement.setAttribute('data-theme-preference', themePreference);
    document.documentElement.setAttribute('data-density', settings.density);
    document.documentElement.setAttribute('data-motion', settings.motion);
    window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
  }, [activeTheme, settings.density, settings.motion, themePreference]);

  const handleToggleTheme = () => {
    setThemePreference((currentTheme) => {
      const currentIndex = THEME_OPTIONS.indexOf(currentTheme);
      return THEME_OPTIONS[(currentIndex + 1) % THEME_OPTIONS.length];
    });
  };

  return (
    <UserContext.Provider value={user}>
      <PostsProvider>
        <TodosProvider>
          <Header
            themePreference={themePreference}
            activeTheme={activeTheme}
            onToggleTheme={handleToggleTheme}
          />
          <Router
            themePreference={themePreference}
            activeTheme={activeTheme}
            onToggleTheme={handleToggleTheme}
          />
          <Footer />
        </TodosProvider>
      </PostsProvider>
    </UserContext.Provider>
  );
}
