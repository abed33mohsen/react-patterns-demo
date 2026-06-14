import { Link } from 'react-router-dom';
import './style.css';

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="not-found-card ui-card">
        <p className="not-found-kicker">404</p>
        <h1>Page not found</h1>
        <p>The route you tried to open does not exist in this project.</p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-link primary ui-link-button ui-link-button--primary">Go Home</Link>
          <Link to="/posts" className="not-found-link secondary ui-link-button ui-link-button--secondary">Open Posts</Link>
        </div>
      </section>
    </main>
  );
}
