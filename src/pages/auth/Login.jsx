import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

function getRedirectTo(search) {
  const value = new URLSearchParams(search).get('redirectTo');
  return value && value.startsWith('/') ? value : '/';
}

export default function Login() {
  const { session, configured, syncAuthCookie } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectTo = getRedirectTo(location.search);

  if (session) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!configured || !supabase) {
      setError('Supabase environment variables are missing.');
      return;
    }

    setIsSubmitting(true);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      setError(signInError.message);
      setIsSubmitting(false);
      return;
    }

    try {
      await syncAuthCookie(data.session);
      navigate(redirectTo, { replace: true });
    } catch (syncError) {
      setError(syncError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      kicker="Welcome back"
      title="Log in before entering"
      description="Use your student account to access assessments and study materials."
      footer={(
        <>
          New to KaniMath? <Link to={`/signup?redirectTo=${encodeURIComponent(redirectTo)}`}>Create an account</Link>
        </>
      )}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" />
        </label>
        {error && <div className="auth-error" role="alert">{error}</div>}
        <button className="btn btn-primary auth-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </button>
        <Link className="auth-small-link" to="/forgot-password">Forgot password?</Link>
      </form>
    </AuthLayout>
  );
}
