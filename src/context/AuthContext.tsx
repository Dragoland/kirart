import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api } from '@/lib/api';

interface AuthContextType {
  isAdmin: boolean;
  checking: boolean;
  login: (password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    api<{ admin: boolean }>('/session')
      .then((r) => setIsAdmin(!!r.admin))
      .catch(() => setIsAdmin(false))
      .finally(() => setChecking(false));
  }, []);

  const login = async (password: string) => {
    await api('/session', { method: 'POST', body: JSON.stringify({ password }) });
    setIsAdmin(true);
  };
  const logout = async () => {
    await api('/session', { method: 'DELETE' }).catch(() => {});
    setIsAdmin(false);
  };

  return <AuthContext.Provider value={{ isAdmin, checking, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
