import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function NotFoundPage() {
  /** 404 page. */
  return (
    <div className="container">
      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 900 }}>Page not found</div>
        <div className="muted" style={{ marginTop: 6 }}>
          The page you requested doesn’t exist.
        </div>
        <div style={{ marginTop: 12 }}>
          <Link className="btn" to="/">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
