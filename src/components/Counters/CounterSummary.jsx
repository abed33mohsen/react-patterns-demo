export default function CounterSummary({ statusLabel, counter, previousCounter }) {
  return (
    <div className="counter-summary">
      <div className="counter-summary-card card-delay-1">
        <span>Live status</span>
        <strong>{statusLabel}</strong>
      </div>
      <div className="counter-summary-card card-delay-2">
        <span>Difference</span>
        <strong>{counter - previousCounter}</strong>
      </div>
      <div className="counter-summary-card card-delay-3">
        <span>Hook focus</span>
        <strong>useState + useRef</strong>
      </div>
    </div>
  );
}
