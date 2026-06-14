import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { PATHS } from '../../router/paths';
import './style.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, login } = useAuthContext();
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const nextPath = location.state?.from?.pathname || PATHS.HOME;

  if (isLoggedIn) {
    return <Navigate to={nextPath} replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

     if (name.trim() && name.trim().length < 2) {
      setErrorMessage('Please enter at least 2 characters for the name.');
      return;
    }

    setErrorMessage('');
    login(name);
    navigate(nextPath, {
      replace: true,
      state: { flashMessage: `Welcome, ${name.trim() || 'React Student'}!` },
    });
  };

  const handleDemoLogin = () => {
    setErrorMessage('');
    login('Demo User');
    navigate(nextPath, {
      replace: true,
      state: { flashMessage: 'Welcome, Demo User!' },
    });
  };

  return (
    <main className="login-page">
      <section className="login-card ui-card">
        <p className="login-kicker">Login</p>
        <h1>Enter the workspace</h1>
        <p className="login-text">
          This is a simple demo sign-in for the project. Log in to open protected pages like Profile and Settings.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span>Your name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (errorMessage) {
                  setErrorMessage('');
                }
              }}
              placeholder="Type your name or continue as demo user"
            />
          </label>
          {errorMessage ? <p className="login-error-message">{errorMessage}</p> : null}

          <div className="login-actions">
            <button type="submit" className="ui-button ui-button--primary">
              Sign In
            </button>
            <button type="button" className="ui-button ui-button--secondary" onClick={handleDemoLogin}>
              Demo Login
            </button>
            <Link to={PATHS.HOME} className="ui-link-button ui-link-button--ghost">
              Back Home
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
