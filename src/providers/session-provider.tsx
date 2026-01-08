"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { UserProfile } from "@/types/user";
import { SESSION_STORAGE_KEY } from "@/types/user";

interface SessionContextValue {
  /** Current user profile, null if not logged in */
  user: UserProfile | null;
  /** Whether the session is still being loaded from storage */
  isLoading: boolean;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Save user profile to session */
  login: (profile: UserProfile) => void;
  /** Update existing user profile */
  updateProfile: (profile: UserProfile) => void;
  /** Clear user session */
  logout: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

interface SessionProviderProps {
  children: React.ReactNode;
}

/**
 * Provides user session management with localStorage persistence
 */
export function SessionProvider({ children }: SessionProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserProfile;
        setUser(parsed);
      }
    } catch (error) {
      console.error("Failed to load session from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(profile));
  }, []);

  const updateProfile = useCallback((profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(profile));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      login,
      updateProfile,
      logout,
    }),
    [user, isLoading, login, updateProfile, logout]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

/**
 * Hook to access session context
 * @throws Error if used outside of SessionProvider
 */
export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
