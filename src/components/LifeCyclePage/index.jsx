import React, { Component } from 'react';
import './style.css';

class Counter extends Component {
  componentWillUnmount() {
    // Lifecycle demo
  }

  render() {
    const { count, onIncrease, onDecrease } = this.props;

    return (
      <div className="lifecycle-counter-card">
        <p className="lifecycle-count">{count}</p>
        <div className="lifecycle-actions">
          <button onClick={onDecrease} className="lifecycle-button secondary">Decrease</button>
          <button onClick={onIncrease} className="lifecycle-button primary">Increase</button>
        </div>
      </div>
    );
  }
}

export default class LifeCyclePage extends Component {
  state = {
    count: 0,
    isCounterExist: true,
  };

  handleIncrease = () => {
    this.setState((prev) => ({ count: prev.count + 1 }));
  };

  handleDecrease = () => {
    this.setState((prev) => ({ count: prev.count - 1 }));
  };

  handleReset = () => {
    this.setState({
      count: 0,
      isCounterExist: true,
    });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.count !== this.state.count && this.state.count >= 15 && this.state.isCounterExist) {
      this.setState({ isCounterExist: false });
    }
  }

  render() {
    return (
      <main className="lifecycle-page">
        <section className="lifecycle-panel">
          <p className="lifecycle-kicker">Class Component</p>
          <h1>LifeCycle Page</h1>
          <p className="lifecycle-text">
            Increase the counter until it reaches 15 to unmount the child component.
          </p>

          {this.state.isCounterExist ? (
            <Counter
              count={this.state.count}
              onIncrease={this.handleIncrease}
              onDecrease={this.handleDecrease}
            />
          ) : (
            <div className="lifecycle-message">
              <h2>Counter removed at 15</h2>
              <p>The child component was unmounted. You can start again with reset.</p>
            </div>
          )}

          <div className="lifecycle-reset-row">
            <button onClick={this.handleReset} className="lifecycle-button neutral">Reset Counter</button>
          </div>
        </section>
      </main>
    );
  }
}
