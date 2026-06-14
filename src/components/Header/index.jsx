import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { PATHS } from '../../router/paths';
import './style.css';

const primaryLinks = [
  { to: PATHS.HOME, label: 'Dashboard' },
  { to: PATHS.TODO, label: 'Tasks' },
  { to: PATHS.POSTS.ROOT, label: 'Notes' },
  { to: PATHS.COUNTERS, label: 'Counters' },
  { to: PATHS.PROFILE, label: 'Profile' },
];

const utilityLinks = [
  { to: PATHS.SETTINGS, label: 'Settings' },
  { to: PATHS.ABOUT, label: 'About' },
  { to: PATHS.HOOKS, label: 'Hooks' },
  { to: PATHS.ROUTER, label: 'Router' },
];

const themeLabels = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

const themeIcons = {
  light: 'Sun',
  dark: 'Moon',
  system: 'Auto',
};

export default function Header({ themePreference, activeTheme, onToggleTheme }) {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate(PATHS.HOME, {
      state: { flashMessage: 'Logged out successfully.' },
    });
  };

  return (
    <header className="fixed-header">
      <nav className="site-nav">
        <div className="brand-wrap">
          <NavLink to={PATHS.HOME} className="brand-logo">
            Alara Flow
          </NavLink>
          <p className="brand-subtitle">Personal productivity workspace</p>
        </div>

        <div className="nav-stack">
          <ul className="nav-links">
            {primaryLinks
              .filter((link) => (link.to === PATHS.PROFILE ? isLoggedIn : true))
              .map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-utilities">
            {utilityLinks
              .filter((link) => (link.to === PATHS.SETTINGS ? isLoggedIn : true))
              .map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `utility-link${isActive ? ' active' : ''}`}>
                {link.label}
              </NavLink>
            ))}
            {isLoggedIn ? (
              <span className="header-user-pill">{user?.name}</span>
            ) : (
              <NavLink to={PATHS.LOGIN} className="utility-link login-link">
                Login
              </NavLink>
            )}
            <button
              type="button"
              className="theme-toggle"
              onClick={onToggleTheme}
              title={`Theme: ${themeLabels[themePreference]} (${themeLabels[activeTheme]} active)`}
            >
              <span className="theme-toggle-badge">{themeIcons[themePreference]}</span>
              <span>{themeLabels[themePreference]}</span>
            </button>
            {isLoggedIn ? (
              <button type="button" className="logout-button" onClick={handleLogout}>
                Sign Out
              </button>
            ) : null}
            <NavLink to={PATHS.POSTS.ROOT} className="nav-cta ui-link-button ui-link-button--primary">
              New Note
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
