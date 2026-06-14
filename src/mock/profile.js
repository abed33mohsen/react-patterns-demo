import USER from './user';
import profileAvatar from '../assets/profile-avatar.svg';

const PROFILE = {
  initials: 'RA',
  imageUrl: profileAvatar,
  imageAlt: 'Profile portrait',
  title: 'React Atelier Student Profile',
  description:
    'A clean profile page for presenting personal details, current learning goals, and the skills you are building inside this React workspace.',
  overviewTitle: 'Focused on building polished front-end pages.',
  overviewText:
    'This section can later connect to real user data, but for now it gives you a professional profile layout ready for practice and customization.',
  editLabel: 'Edit Profile',
  skills: ['React', 'Routing', 'State Management', 'UI Styling'],
  details: [
    { label: 'Name', value: USER.name },
    { label: 'Role', value: USER.role },
    { label: 'Goal', value: 'Build modern and clean React interfaces' },
    { label: 'Current Topic', value: 'Components, routes, tables, and pages' },
  ],
  socials: [
    { label: 'GitHub', value: '@reactatelier', href: 'https://github.com/' },
    { label: 'LinkedIn', value: 'React Atelier', href: 'https://www.linkedin.com/' },
    { label: 'Portfolio', value: 'react-atelier.dev', href: 'https://example.com/' },
  ],
  highlights: [
    { label: 'Projects', value: '08' },
    { label: 'Components', value: '24+' },
    { label: 'Learning Focus', value: 'Frontend' },
  ],
};

export default PROFILE;
