import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPassword() {
  const { configured } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!configured || !supabase) {
      setError('Supabase environment variables are missing.');
      return;
    }

    setIsSubmitting(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage('Password reset email sent. Check your inbox for the next step.');
    }

    setIsSubmitting(false);
  }

  return (
    <AuthLayout
      kicker="Password reset"
      title="Recover your account"
      description="Enter your email and we will send a secure reset link."
      footer={<Link to="/login">Back to login</Link>}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
        </label>
        {error && <div className="auth-error" role="alert">{error}</div>}
        {message && <div className="auth-success" role="status">{message}</div>}
        <button className="btn btn-primary auth-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send reset email'}
        </button>
      </form>
    </AuthLayout>
  );
}
