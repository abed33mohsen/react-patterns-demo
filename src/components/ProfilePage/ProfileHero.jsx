export default function ProfileHero({ profile, user, onOpenEditor }) {
  return (
    <section className="profile-hero">
      <div className="profile-card profile-main ui-card">
        <div className="profile-avatar">
          <img src={profile.imageUrl} alt={profile.imageAlt} className="profile-avatar-image" />
          <span className="profile-avatar-badge">{profile.initials}</span>
        </div>

        <div className="profile-copy">
          <p className="profile-kicker">Profile</p>
          <h1>{profile.title}</h1>
          <p className="profile-text">{profile.description}</p>
          <div className="profile-context-banner">
            <strong>Context Demo:</strong> {user.name} - {user.role}
          </div>
          <div className="profile-tags">
            {profile.skills.map((skill) => (
              <span key={skill} className="profile-tag">{skill}</span>
            ))}
          </div>
          <div className="profile-actions">
            <button className="profile-button primary ui-button ui-button--primary" onClick={onOpenEditor}>
              {profile.editLabel}
            </button>
          </div>
        </div>
      </div>

      <aside className="profile-card profile-side ui-card">
        <p className="profile-kicker">Overview</p>
        <h2>{profile.overviewTitle}</h2>
        <p className="profile-text">{profile.overviewText}</p>
      </aside>
    </section>
  );
}
