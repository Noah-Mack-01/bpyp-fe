// src/providers/AuthProvider.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store'; // For Expo apps
// OR import { Keychain } from 'react-native-keychain'; // For non-Expo apps
import authAPI, { supabase } from '../api/auth';
import { AuthenticationContext } from '../data/auth';
import { AuthError, Session } from '@supabase/supabase-js';
import { Alert } from 'react-native';

const AuthContext = createContext(null as AuthenticationContext | null);

export const AuthProvider = ({ children }: any) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null)
 
  async function methodWrapper<T>(func: (obj?: T) => Promise<void>, obj?: T): Promise<void> {  
    setIsLoading(true);
    setError(null);
    try { !!obj ? func(obj) : func(); }
    catch (err) {
      setError(err);
      console.error(`${func.name} failed`, err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {    
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));    
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, [])

  // Value object to be provided to consumers
  const authContextValue: AuthenticationContext = {
    session,
    isLoading,
    error,
    login: (creds) => methodWrapper(authAPI.login, creds),
    register: (creds) => methodWrapper(authAPI.register, creds),
    logout: () => methodWrapper(authAPI.logout),
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};