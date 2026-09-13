import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USER = 'admin';
const DEFAULT_PASSWORD = 'Kanimath@123';
const AUTH_STORAGE_KEY = 'kanimath_auth';

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored === 'true') {
      setSession({ user: { username: DEFAULT_USER, email: 'admin@kanimath.app' } });
    }
    setLoading(false);
  }, []);

  const signIn = useCallback(async (username, password) => {
    if (username === DEFAULT_USER && password === DEFAULT_PASSWORD) {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setSession({ user: { username: DEFAULT_USER, email: 'admin@kanimath.app' } });
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setSession(null);
  }, []);

  const syncAuthCookie = useCallback(async (session) => {
    if (session?.access_token) {
      const days = 365;
      const cookie = `kanimath-auth=${encodeURIComponent(session.access_token)}; path=/; max-age=${days * 86400}; samesite=lax; secure`;
      document.cookie = cookie;
    }
  }, []);

  const configured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

  const value = useMemo(() => ({
    session,
    loading,
    configured,
    signIn,
    signOut,
    syncAuthCookie
  }), [session, loading, configured, signIn, signOut, syncAuthCookie]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
}
