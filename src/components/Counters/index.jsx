import React, { useRef, useState } from "react";
import CounterHistory from "./CounterHistory";
import CounterSummary from "./CounterSummary";
import { getCounterStatus } from "./utils";
import "./style.css";

export default function CountersPage() {
  const [counter, setCounter] = useState(0);
  const previousCounterRef = useRef(0);
  const { isPositive, isNegative, label: statusLabel } = getCounterStatus(counter);
  const target = 10;
  const achievedTarget = counter >= target;
  const progressValue = counter <= 0 ? 0 : Math.min(Math.round((counter / target) * 100), 100);

  const handleDecrease = () => {
    previousCounterRef.current = counter;
    setCounter((prevCounter) => prevCounter - 1);
  };

  const handleIncrease = () => {
    previousCounterRef.current = counter;
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleReset = () => {
    previousCounterRef.current = counter;
    setCounter(0);
  };

  const handleQuickChange = (amount) => {
    previousCounterRef.current = counter;
    setCounter((prevCounter) => prevCounter + amount);
  };

  return (
    <main className="counters-page">
      <section className="counter-panel">
        <p className="counter-kicker">Focus Counter</p>
        <h1>Track progress with a cleaner counter flow</h1>
        <p className="counter-description">
          Use this counter like a tiny focus tracker. It updates the current value with{' '}
          <code>useState</code> and keeps the previous value using <code>useRef</code>.
        </p>

        <div className="counter-goal-card">
          <div>
            <span className="counter-goal-label">Current target</span>
            <strong>{target} points</strong>
          </div>
          <div className={`counter-goal-badge${achievedTarget ? ' success' : ''}`}>
            {achievedTarget ? 'Target reached' : `${progressValue}% complete`}
          </div>
        </div>

        <CounterSummary
          statusLabel={statusLabel}
          counter={counter}
          previousCounter={previousCounterRef.current}
        />

        <div className={`counter-display${isPositive ? " glow-positive" : ""}${isNegative ? " glow-negative" : ""}`}>
          <span key={counter}>{counter}</span>
        </div>

        <p
          className={`counter-status${isPositive ? " positive" : ""}${isNegative ? " negative" : ""}`}
        >
          {statusLabel}
        </p>

        <div className="counter-progress">
          <div className="counter-progress-bar">
            <span style={{ width: `${progressValue}%` }} />
          </div>
          <p className="counter-progress-text">
            {achievedTarget ? 'You reached the goal.' : `${Math.max(target - counter, 0)} points left to reach the target.`}
          </p>
        </div>

        <CounterHistory counter={counter} previousCounter={previousCounterRef.current} />

        <div className="counter-quick-actions">
          <button onClick={() => handleQuickChange(-5)} className="counter-chip" type="button">
            -5
          </button>
          <button onClick={() => handleQuickChange(5)} className="counter-chip" type="button">
            +5
          </button>
          <button onClick={() => handleQuickChange(10)} className="counter-chip" type="button">
            +10
          </button>
        </div>

        <div className="counter-actions">
          <button onClick={handleDecrease} className="counter-button secondary ui-button ui-button--secondary">
            Decrease
          </button>
          <button onClick={handleIncrease} className="counter-button primary ui-button ui-button--primary">
            Increase
          </button>
        </div>

        <div className="counter-reset-row">
          <button onClick={handleReset} className="counter-button neutral ui-button ui-button--ghost">
            Reset
          </button>
        </div>

        <div className="counter-note">
          <h2>Quick note</h2>
          <p>
            <code>useState</code> changes the current number, while{" "}
            <code>useRef</code> keeps the previous value without forcing an
            extra render.
          </p>
        </div>
      </section>
    </main>
  );
}
