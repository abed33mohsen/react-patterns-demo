import './style.css';

export default function Card({ title, imageSrc, imageAlt, description, actionLabel }) {
  return (
    <article className="card">
      <img src={imageSrc} alt={imageAlt} className="card-image" />
      <div className="card-body">
        <h3>{title}</h3>
        <p>{description}</p>
        <button type="button" className="card-button">{actionLabel}</button>
      </div>
    </article>
  );
}
