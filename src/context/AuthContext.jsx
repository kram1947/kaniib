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
      setSession({ user: { username: DEFAULT_USER } });
    }
    setLoading(false);
  }, []);

  const signIn = useCallback(async (username, password) => {
    if (username === DEFAULT_USER && password === DEFAULT_PASSWORD) {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setSession({ user: { username: DEFAULT_USER } });
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo(() => ({
    session,
    loading,
    signIn,
    signOut
  }), [session, loading, signOut]);

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
