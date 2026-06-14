import { createContext, useContext, useMemo, useState } from 'react';
import USER from '../mock/user';

const AUTH_STORAGE_KEY = 'alara-flow-auth-user';

const getInitialUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const savedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch (error) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  const persistUser = (nextUser) => {
    setUser(nextUser);
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
  };

  const login = (name) => {
    const nextUser = {
      ...USER,
      name: name?.trim() || USER.name,
    };

    persistUser(nextUser);
  };

  const updateUser = (updates) => {
    setUser((currentUser) => {
      const baseUser = currentUser || USER;
      const nextUser = {
        ...baseUser,
        ...updates,
      };

      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
      return nextUser;
    });
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = useMemo(() => ({
    user,
    isLoggedIn: Boolean(user),
    login,
    updateUser,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return context;
}
