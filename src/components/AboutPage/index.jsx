import Card from '../Card';
import CARDS_DATA from '../../mock/cards';
import './style.css';

export default function AboutPage() {
  const aboutFeatures = [
    {
      title: 'Clean Structure',
      text: 'The project is split into focused pages and reusable components so every section stays easier to understand.',
    },
    {
      title: 'Real Practice',
      text: 'Instead of static examples only, the app now includes CRUD, filtering, navigation, and shared UI patterns.',
    },
    {
      title: 'Visual Consistency',
      text: 'Buttons, cards, spacing, and page sections are being aligned into one product-style system.',
    },
  ];

  return (
    <main className="about-page">
      <header className="about-header ui-card">
        <p className="about-kicker">About</p>
        <h1>About This React Workspace</h1>
        <p>
          This page explains the direction of the project and shows how small React exercises are growing into a cleaner dashboard-style product.
        </p>
      </header>

      <section className="about-summary-grid">
        <div className="about-summary-card ui-card ui-card--soft">
          <strong>Reusable UI</strong>
          <span>Cards mapped from shared mock data.</span>
        </div>
        <div className="about-summary-card ui-card ui-card--soft">
          <strong>Layout Practice</strong>
          <span>A simple responsive section to improve structure and spacing.</span>
        </div>
        <div className="about-summary-card ui-card ui-card--soft">
          <strong>Component Thinking</strong>
          <span>Small pieces that are easy to reuse and restyle later.</span>
        </div>
      </section>

      <section className="about-story ui-card">
        <div className="about-story-copy">
          <p className="about-kicker">Project Direction</p>
          <h2>From practice pages to one connected experience</h2>
          <p>
            The goal is no longer just rendering components. The app now moves toward a more complete interface with connected pages,
            better routing, reusable actions, stronger spacing, and clearer content hierarchy.
          </p>
        </div>

        <div className="about-feature-list">
          {aboutFeatures.map((feature) => (
            <article key={feature.title} className="about-feature-card">
              <strong>{feature.title}</strong>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="about-cards-row">
        {CARDS_DATA.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </main>
  );
}
