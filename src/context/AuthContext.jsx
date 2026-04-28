import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

async function syncAuthCookie(session) {
  if (!session?.access_token) {
    return;
  }

  const response = await fetch('/api/auth/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ accessToken: session.access_token })
  });

  if (!response.ok) {
    throw new Error('Could not sync authentication cookie.');
  }
}

async function clearAuthCookie() {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include'
  });
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return undefined;
    }

    let mounted = true;

    supabase.auth.getSession().then(async ({ data, error }) => {
      if (!mounted) return;

      if (error) {
        setAuthError(error.message);
      }

      const currentSession = data?.session || null;
      setSession(currentSession);
      setUser(currentSession?.user || null);

      try {
        await syncAuthCookie(currentSession);
      } catch (syncError) {
        if (currentSession) {
          setAuthError(syncError.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user || null);
      setAuthError('');

      if (nextSession) {
        try {
          await syncAuthCookie(nextSession);
        } catch (syncError) {
          setAuthError(syncError.message);
        }
      } else {
        await clearAuthCookie();
      }
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    await clearAuthCookie();
    setSession(null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    session,
    user,
    loading,
    authError,
    configured: isSupabaseConfigured,
    signOut,
    syncAuthCookie
  }), [session, user, loading, authError, signOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }
  return context;
}
