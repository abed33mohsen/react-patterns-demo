export default function CounterHistory({ counter, previousCounter }) {
  return (
    <div className="counter-history">
      <div className="counter-history-card card-delay-1">
        <p>Current</p>
        <strong>{counter}</strong>
      </div>
      <div className="counter-history-card card-delay-2">
        <p>Previous</p>
        <strong>{previousCounter}</strong>
      </div>
    </div>
  );
}
