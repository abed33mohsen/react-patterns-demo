import { Link } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import './style.css';

const footerLinks = [
  { to: PATHS.HOME, label: 'Dashboard' },
  { to: PATHS.TODO, label: 'Tasks' },
  { to: PATHS.POSTS.ROOT, label: 'Notes' },
  { to: PATHS.SETTINGS, label: 'Settings' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed-footer">
      <div className="footer-shell">
        <div className="footer-brand-block">
          <p className="footer-brand">Alara Flow</p>
          <p className="footer-note">A focused productivity dashboard for tasks, notes, and personal workflow.</p>
          <div className="footer-status-row">
            <span className="footer-status-pill">React Workspace</span>
            <span className="footer-status-pill soft">Theme Ready</span>
          </div>
        </div>

        <div className="footer-links">
          {footerLinks.map((link) => (
            <Link key={link.to} to={link.to} className="footer-link">
              {link.label}
            </Link>
          ))}
        </div>

        <p className="footer-copy">Copyright &copy; {currentYear} Alara Programming.</p>
      </div>
    </footer>
  );
}
