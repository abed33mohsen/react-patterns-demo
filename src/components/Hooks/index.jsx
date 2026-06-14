import React from 'react';
import UserContext from '../../context/UserContext';
import './style.css';

const Hooks = () => {
  const guestUser = {
    name: 'Guest User',
    role: 'Visitor',
  };
  const getData = () => ({
    count1: 1,
    count2: 2,
  });

  const [state, setState] = React.useState(getData());
  const [seconds, setSeconds] = React.useState(0);
  const inputRef = React.useRef(null);
  const user = React.useContext(UserContext) || guestUser;

  const handleIncrement = () => {
    setState((prevState) => ({
      ...prevState,
      count1: prevState.count1 + 1,
    }));
  };

  const handleDecrement = () => {
    setState((prevState) => ({
      ...prevState,
      count2: prevState.count2 - 1,
    }));
  };

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <main className="hooks-page">
      <section className="hooks-card">
        <p className="hooks-kicker">React Hooks</p>
        <h1>Object State Example</h1>
        <p className="hooks-text">
          This example shows how to update separate values inside one state object using
          <code> useState</code>.
        </p>
        <p className="hooks-note">Use it when you need values that change and update the UI.</p>
        <p className="hooks-warning">Common mistake: changing state directly instead of using the setter function.</p>

        <div className="hooks-grid">
          <div className="hooks-counter-box">
            <span className="hooks-label">Count 1</span>
            <strong>{state.count1}</strong>
            <button type="button" className="hooks-button primary" onClick={handleIncrement}>
              Increase Count 1
            </button>
          </div>

          <div className="hooks-counter-box">
            <span className="hooks-label">Count 2</span>
            <strong>{state.count2}</strong>
            <button type="button" className="hooks-button secondary" onClick={handleDecrement}>
              Decrease Count 2
            </button>
          </div>
        </div>
      </section>

      <section className="hooks-card hooks-card-secondary">
        <p className="hooks-kicker">React Hooks</p>
        <h2>useEffect Example</h2>
        <p className="hooks-text">
          This timer increases every second because <code>useEffect</code> runs a side effect
          after the component mounts.
        </p>
        <p className="hooks-note">Use it for side effects like fetch, timers, or subscriptions.</p>
        <p className="hooks-warning">Common mistake: forgetting cleanup for timers or listeners.</p>

        <div className="hooks-single-box">
          <span className="hooks-label">Seconds</span>
          <strong>{seconds}</strong>
        </div>
      </section>

      <section className="hooks-card hooks-card-secondary">
        <p className="hooks-kicker">React Hooks</p>
        <h2>useRef Example</h2>
        <p className="hooks-text">
          The button below uses <code>useRef</code> to move focus directly into the input field.
        </p>
        <p className="hooks-note">Use it for DOM access or keeping values without re-render.</p>
        <p className="hooks-warning">Common mistake: using ref instead of state for values that must update the UI.</p>

        <div className="hooks-ref-box">
          <input
            ref={inputRef}
            type="text"
            className="hooks-input"
            placeholder="Type here after focus..."
          />
          <button type="button" className="hooks-button primary" onClick={handleFocusInput}>
            Focus Input
          </button>
        </div>
      </section>

      <section className="hooks-card hooks-card-secondary">
        <p className="hooks-kicker">React Hooks</p>
        <h2>useContext Example</h2>
        <p className="hooks-text">
          This section reads shared data directly from <code>UserContext</code> without passing
          props through multiple components.
        </p>
        <p className="hooks-note">Use it when the same data is needed in many components.</p>
        <p className="hooks-warning">Common mistake: putting too much unrelated data in one context.</p>

        <div className="hooks-context-box">
          <div className="hooks-context-row">
            <span className="hooks-label">Name</span>
            <strong>{user.name}</strong>
          </div>
          <div className="hooks-context-row">
            <span className="hooks-label">Role</span>
            <strong>{user.role}</strong>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hooks;
