import { Link } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import './style.css';

const routeExamples = [
  {
    label: 'Home',
    path: PATHS.HOME,
    note: 'The main landing page for the project.',
  },
  {
    label: 'Posts',
    path: PATHS.POSTS.ROOT,
    note: 'A route that shows a list page with API data.',
  },
  {
    label: 'Post Details',
    path: PATHS.POSTS.VIEW,
    note: 'Dynamic route example using a parameter like :id.',
  },
  {
    label: 'Todo Details',
    path: PATHS.TODO_VIEW,
    note: 'Another dynamic route that reads a task id from the URL.',
  },
];

const concepts = [
  {
    title: 'Routes',
    text: 'Routes decide which component should appear for the current URL.',
  },
  {
    title: 'Link / NavLink',
    text: 'Use them to navigate without full page reloads in React apps.',
  },
  {
    title: 'useParams',
    text: 'Use it to read values such as id from dynamic routes.',
  },
  {
    title: 'Navigate',
    text: 'Use it to redirect users when a route is missing or invalid.',
  },
];

export default function RouterPage() {
  return (
    <main className="router-page">
      <section className="router-hero">
        <div className="router-copy ui-card">
          <p className="router-kicker">React Router</p>
          <h1>How navigation works in this project.</h1>
          <p>
            This page is a compact guide to the route system used here, with examples from the
            actual app structure.
          </p>
        </div>

        <div className="router-hero-card ui-card">
          <span className="router-hero-label">Current focus</span>
          <strong>Routes + Links + Params</strong>
          <p>Use this page to review the core building blocks of navigation.</p>
        </div>
      </section>

      <section className="router-section">
        <div className="router-section-head">
          <p className="router-kicker">Core Concepts</p>
          <h2>What to remember</h2>
        </div>

        <div className="router-concepts-grid">
          {concepts.map((concept) => (
            <article key={concept.title} className="router-concept-card ui-card">
              <h3>{concept.title}</h3>
              <p>{concept.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="router-section">
        <div className="router-section-head">
          <p className="router-kicker">Route Examples</p>
          <h2>Real paths from the app</h2>
        </div>

        <div className="router-routes-list">
          {routeExamples.map((route) => (
            <article key={route.label} className="router-route-card ui-card">
              <div>
                <span className="router-route-label">{route.label}</span>
                <strong>{route.path}</strong>
                <p>{route.note}</p>
              </div>
              <Link to={route.path.replace(':id', '1')} className="router-link-button">
                Open Example
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="router-section">
        <div className="router-section-head">
          <p className="router-kicker">Quick Notes</p>
          <h2>Common mistakes</h2>
        </div>

        <div className="router-notes ui-card">
          <p>Do not use plain anchor tags for internal navigation when React Router is available.</p>
          <p>Use dynamic segments like <code>:id</code> only when the page needs URL-based data.</p>
          <p>Keep route paths centralized in one file when the app grows.</p>
        </div>
      </section>
    </main>
  );
}
