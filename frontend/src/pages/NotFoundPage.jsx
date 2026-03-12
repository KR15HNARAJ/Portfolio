import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <main className="not-found-page">
    <div className="not-found-card">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  </main>
);

export default NotFoundPage;
