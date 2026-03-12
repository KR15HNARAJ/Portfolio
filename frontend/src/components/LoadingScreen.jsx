const LoadingScreen = () => (
  <div className="loading-wrap">
    <div className="container loading-content">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-line long" />
      <div className="skeleton skeleton-line short" />
      <div className="loading-grid">
        <div className="skeleton skeleton-card" />
        <div className="skeleton skeleton-card" />
      </div>
    </div>
  </div>
);

export default LoadingScreen;
