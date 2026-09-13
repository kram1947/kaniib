import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

function getRedirectTo(search) {
  const value = new URLSearchParams(search).get('redirectTo');
  return value && value.startsWith('/') ? value : '/';
}

export default function AuthCallback() {
  const { configured, syncAuthCookie } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    async function finishAuth() {
      if (!configured || !supabase) {
        setError('Supabase environment variables are missing.');
        return;
      }

      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !data?.session) {
        setError(sessionError?.message || 'No confirmed session was found. Please log in.');
        return;
      }

      try {
        await syncAuthCookie(data.session);
        navigate(getRedirectTo(location.search), { replace: true });
      } catch (syncError) {
        setError(syncError.message);
      }
    }

    finishAuth();
  }, [configured, location.search, navigate, syncAuthCookie]);

  return (
    <AuthLayout
      kicker="Confirmation"
      title={error ? 'Could not finish login' : 'Finishing login'}
      description={error || 'Your account is being confirmed. This usually takes a moment.'}
      footer={error && <Link to="/login">Back to login</Link>}
    />
  );
}
