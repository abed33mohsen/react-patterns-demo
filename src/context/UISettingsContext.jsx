import { createContext, useContext, useMemo, useState } from 'react';

const UI_SETTINGS_STORAGE_KEY = 'alara-flow-ui-settings';

const DEFAULT_SETTINGS = {
  density: 'comfortable',
  motion: 'full',
};

const getInitialSettings = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS;
  }

  const savedSettings = window.localStorage.getItem(UI_SETTINGS_STORAGE_KEY);

  if (!savedSettings) {
    return DEFAULT_SETTINGS;
  }

  try {
    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(savedSettings),
    };
  } catch (error) {
    window.localStorage.removeItem(UI_SETTINGS_STORAGE_KEY);
    return DEFAULT_SETTINGS;
  }
};

const UISettingsContext = createContext(null);

export function UISettingsProvider({ children }) {
  const [settings, setSettings] = useState(getInitialSettings);

  const updateSettings = (updates) => {
    setSettings((currentSettings) => {
      const nextSettings = {
        ...currentSettings,
        ...updates,
      };

      window.localStorage.setItem(UI_SETTINGS_STORAGE_KEY, JSON.stringify(nextSettings));
      return nextSettings;
    });
  };

  const value = useMemo(() => ({
    settings,
    updateSettings,
    toggleDensity: () => {
      updateSettings({
        density: settings.density === 'compact' ? 'comfortable' : 'compact',
      });
    },
    toggleMotion: () => {
      updateSettings({
        motion: settings.motion === 'reduced' ? 'full' : 'reduced',
      });
    },
  }), [settings]);

  return <UISettingsContext.Provider value={value}>{children}</UISettingsContext.Provider>;
}

export function useUISettingsContext() {
  const context = useContext(UISettingsContext);

  if (!context) {
    throw new Error('useUISettingsContext must be used within UISettingsProvider');
  }

  return context;
}
