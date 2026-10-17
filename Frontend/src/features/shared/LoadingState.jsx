import "./loading-state.scss";

const LoadingState = ({
  message = "Getting things ready",
  detail = "This should only take a moment.",
}) => (
  <main className="loading-state" role="status" aria-live="polite" aria-busy="true">
    <div className="loading-state__card">
      <span className="loading-state__brand">
        SkillScan<span>.AI</span>
      </span>
      <div className="loading-state__indicator" aria-hidden="true">
        <span />
      </div>
      <h1 className="loading-state__title">{message}</h1>
      <p className="loading-state__detail">{detail}</p>
      <div className="loading-state__skeleton" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  </main>
);

export default LoadingState;
