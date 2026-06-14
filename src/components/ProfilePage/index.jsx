import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import UserContext from '../../context/UserContext';
import ToastMessage from '../ToastMessage';
import useTimedMessage from '../../hooks/useTimedMessage';
import PROFILE from '../../mock/profile';
import { getProfileFormState } from './helpers';
import ProfileEditModal from './ProfileEditModal';
import ProfileHero from './ProfileHero';
import './style.css';

export default function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateUser } = useAuthContext();
  const user = useContext(UserContext);
  const [profile, setProfile] = useState(PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState(getProfileFormState(PROFILE));
  const [formError, setFormError] = useState('');
  const { message, setMessage } = useTimedMessage();
  const profileFocusItems = [
    {
      title: 'Current Focus',
      text: 'Building cleaner React pages with stronger routing, CRUD patterns, and reusable UI sections.',
    },
    {
      title: 'Next Step',
      text: 'Turn practice pages into a connected product experience with better structure and visual consistency.',
    },
    {
      title: 'Strength',
      text: 'Fast iteration, component thinking, and learning by improving real interfaces instead of isolated snippets.',
    },
  ];

  const profileDetails = useMemo(() => (
    profile.details.map((item) => {
      if (item.label === 'Name') {
        return { ...item, value: user?.name || item.value };
      }

      if (item.label === 'Role') {
        return { ...item, value: user?.role || item.value };
      }

      return item;
    })
  ), [profile.details, user]);

  useEffect(() => {
    const flashMessage = location.state?.flashMessage;

    if (!flashMessage) {
      return;
    }

    setMessage(flashMessage);
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.pathname, location.state, navigate, setMessage]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (formError) {
      setFormError('');
    }
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenEditor = () => {
    setFormState(getProfileFormState(profile));
    setFormError('');
    setIsEditing(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formState.name.trim() || !formState.role.trim() || !formState.title.trim()) {
      setFormError('Name, role, and title are required.');
      return;
    }

    setProfile((prev) => ({
      ...prev,
      title: formState.title,
      description: formState.description,
      overviewTitle: formState.overviewTitle,
      overviewText: formState.overviewText,
      details: prev.details.map((item) => {
        if (item.label === 'Name') {
          return { ...item, value: formState.name };
        }

        if (item.label === 'Role') {
          return { ...item, value: formState.role };
        }

        return item;
      }),
    }));
    updateUser({
      name: formState.name,
      role: formState.role,
    });
    setMessage('Profile updated successfully.');
    setIsEditing(false);
  };

  return (
    <main className="profile-page">
      <ToastMessage message={message} />
      <ProfileHero profile={profile} user={user} onOpenEditor={handleOpenEditor} />

      <section className="profile-grid">
        <div className="profile-card profile-details ui-card">
          <p className="profile-kicker">About</p>
          <h3>Profile Details</h3>
          <ul className="profile-list">
            {profileDetails.map((item) => (
              <li key={item.label}><strong>{item.label}:</strong> {item.value}</li>
            ))}
          </ul>
        </div>

        <div className="profile-card profile-stats ui-card">
          <p className="profile-kicker">Stats</p>
          <div className="stats-grid">
            {profile.highlights.map((item) => (
              <div key={item.label} className="stat-box">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="profile-focus-section">
        <div className="profile-focus-head">
          <div>
            <p className="profile-kicker">Workspace Snapshot</p>
            <h3>What this profile is focused on</h3>
          </div>
        </div>

        <div className="profile-focus-grid">
          {profileFocusItems.map((item) => (
            <article key={item.title} className="profile-focus-card ui-card ui-card--soft">
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-social-section">
        <div className="profile-card profile-socials ui-card">
          <p className="profile-kicker">Social Links</p>
          <h3>Find this profile around the web</h3>
          <div className="social-grid">
            {profile.socials.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="social-card">
                <span className="social-label">{item.label}</span>
                <strong>{item.value}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ProfileEditModal
        formState={formState}
        errorMessage={formError}
        isOpen={isEditing}
        onChange={handleInputChange}
        onClose={() => {
          setFormError('');
          setIsEditing(false);
        }}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
