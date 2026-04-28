import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { session, loading, configured } = useAuth();
  const location = useLocation();
  const redirectTo = `${location.pathname}${location.search}${location.hash}`;

  if (!configured) {
    return (
      <main className="auth-shell">
        <section className="auth-card">
          <p className="auth-kicker">Configuration required</p>
          <h1>Connect Supabase to continue</h1>
          <p className="auth-copy">
            Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment, then restart the app.
          </p>
        </section>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="auth-shell">
        <section className="auth-card">
          <p className="auth-kicker">KaniMath</p>
          <h1>Checking your session</h1>
          <p className="auth-copy">One moment while we prepare your workspace.</p>
        </section>
      </main>
    );
  }

  if (!session) {
    return <Navigate to={`/login?redirectTo=${encodeURIComponent(redirectTo)}`} replace />;
  }

  return <Outlet />;
}
