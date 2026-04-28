import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

function getRedirectTo(search) {
  const value = new URLSearchParams(search).get('redirectTo');
  return value && value.startsWith('/') ? value : '/';
}

export default function Signup() {
  const { session, configured } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectTo = getRedirectTo(location.search);

  if (session) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!configured || !supabase) {
      setError('Supabase environment variables are missing.');
      return;
    }

    setIsSubmitting(true);
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`
      }
    });

    if (signupError) {
      setError(signupError.message);
    } else {
      setMessage('Check your email to confirm your account, then return to log in.');
    }

    setIsSubmitting(false);
  }

  return (
    <AuthLayout
      kicker="Create account"
      title="Start with a student account"
      description="Sign up with email and password. You may need to confirm your email before logging in."
      footer={(
        <>
          Already have an account? <Link to={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}>Log in</Link>
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
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength="6" autoComplete="new-password" />
        </label>
        {error && <div className="auth-error" role="alert">{error}</div>}
        {message && <div className="auth-success" role="status">{message}</div>}
        <button className="btn btn-primary auth-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  );
}
