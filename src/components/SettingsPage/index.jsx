import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUISettingsContext } from '../../context/UISettingsContext';
import ToastMessage from '../ToastMessage';
import useTimedMessage from '../../hooks/useTimedMessage';
import { PATHS } from '../../router/paths';
import './style.css';

const preferenceLabels = {
  light: 'Light mode',
  dark: 'Dark mode',
  system: 'System mode',
};

const activeThemeLabels = {
  light: 'Light theme is active now',
  dark: 'Dark theme is active now',
};

export default function SettingsPage({ themePreference, activeTheme, onToggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { message, setMessage } = useTimedMessage();
  const { settings, toggleDensity, toggleMotion } = useUISettingsContext();

  useEffect(() => {
    const flashMessage = location.state?.flashMessage;

    if (!flashMessage) {
      return;
    }

    setMessage(flashMessage);
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.pathname, location.state, navigate, setMessage]);

  return (
    <main className="settings-page">
      <ToastMessage message={message} />
      <section className="settings-hero ui-card">
        <div>
          <p className="settings-kicker">Settings</p>
          <h1>Control the workspace experience</h1>
          <p className="settings-text">
            Adjust how the dashboard feels, review the current appearance mode, and move quickly between the main work areas.
          </p>
        </div>
        <div className="settings-hero-badge">
          <strong>{preferenceLabels[themePreference]}</strong>
          <span>{activeThemeLabels[activeTheme]}</span>
          <div className="settings-status-list">
            <span className="settings-status-pill">{settings.density === 'compact' ? 'Compact layout' : 'Comfortable layout'}</span>
            <span className="settings-status-pill soft">{settings.motion === 'reduced' ? 'Reduced motion' : 'Full motion'}</span>
          </div>
        </div>
      </section>

      <section className="settings-grid">
        <article className="settings-card ui-card">
          <p className="settings-kicker">Appearance</p>
          <h2>Theme mode</h2>
          <p className="settings-text">
            The theme control cycles between Light, Dark, and System. System follows your device preference automatically.
          </p>
          <div className="settings-theme-row">
            <span className="settings-theme-pill">{preferenceLabels[themePreference]}</span>
            <button type="button" className="ui-button ui-button--primary" onClick={onToggleTheme}>
              Change Theme
            </button>
          </div>
        </article>

        <article className="settings-card ui-card">
          <p className="settings-kicker">Interface</p>
          <h2>Layout and motion</h2>
          <div className="settings-option-stack">
            <div className="settings-option-row">
              <div>
                <strong>Density</strong>
                <p className="settings-text">
                  Switch between a more spacious layout and a tighter compact layout.
                </p>
              </div>
              <button type="button" className="ui-button ui-button--secondary" onClick={toggleDensity}>
                {settings.density === 'compact' ? 'Use Comfortable' : 'Use Compact'}
              </button>
            </div>

            <div className="settings-option-row">
              <div>
                <strong>Motion</strong>
                <p className="settings-text">
                  Reduce animations and transitions for a calmer experience.
                </p>
              </div>
              <button type="button" className="ui-button ui-button--secondary" onClick={toggleMotion}>
                {settings.motion === 'reduced' ? 'Use Full Motion' : 'Reduce Motion'}
              </button>
            </div>
          </div>
        </article>

        <article className="settings-card ui-card">
          <p className="settings-kicker">Quick Links</p>
          <h2>Open key pages faster</h2>
          <div className="settings-links">
            <Link to={PATHS.HOME} className="settings-link-card">
              <strong>Dashboard</strong>
              <span>See the overall workspace summary.</span>
            </Link>
            <Link to={PATHS.TODO} className="settings-link-card">
              <strong>Tasks</strong>
              <span>Manage daily todos and filters.</span>
            </Link>
            <Link to={PATHS.POSTS.ROOT} className="settings-link-card">
              <strong>Notes</strong>
              <span>Create and edit saved notes.</span>
            </Link>
            <Link to={PATHS.PROFILE} className="settings-link-card">
              <strong>Profile</strong>
              <span>Update profile details and focus areas.</span>
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
