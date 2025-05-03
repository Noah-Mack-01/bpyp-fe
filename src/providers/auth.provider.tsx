// src/providers/AuthProvider.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store'; // For Expo apps
// OR import { Keychain } from 'react-native-keychain'; // For non-Expo apps
import authAPI from '../api/auth';

const AuthContext = createContext(null as any | null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null) as any | null;
  const [isLoading, setIsLoading] = useState(true);
  const [authTokens, setAuthTokens] = useState(null as any | null);

  // Initialize auth state on app start
  useEffect(() => {
    loadStoredCredentials();
  }, []);

  // Load tokens from secure storage
  const loadStoredCredentials = async () => {
    try {
      setIsLoading(true);
      // Get stored tokens from secure storage
      const tokens = await SecureStore.getItemAsync('auth_tokens');
      if (tokens) {
        const parsedTokens = JSON.parse(tokens);
        // Validate token (check expiration)
        if (isTokenValid(parsedTokens)) {
          setAuthTokens(parsedTokens);
          const userData = await authAPI.getUserProfile(parsedTokens.accessToken);
          setUser(userData);
        } else {
          // Token expired, try to refresh
          await refreshToken(parsedTokens.refreshToken);
        }
      }
    } catch (error) {
      console.error('Failed to load authentication state', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if token is expired
  const isTokenValid = (tokens: { accessToken: any; }) => {
    if (!tokens || !tokens.accessToken) return false;
    // Implementation depends on your token format
    // For JWT: decode and check exp claim
    const expiryTime = /* TODO parse expiry from token */Date.now();
    return expiryTime > Date.now();
  };

  // Login function
  const login = async (credentials: any) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(credentials);
      await storeTokens(response.tokens);
      setAuthTokens(response.tokens);
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: any) => {
    try {
      setIsLoading(true);
      const response = await authAPI.register(userData);
      await storeTokens(response.tokens);
      setAuthTokens(response.tokens);
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Registration failed', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Store tokens securely
  const storeTokens = async (tokens: any) => {
    try {
      await SecureStore.setItemAsync('auth_tokens', JSON.stringify(tokens));
    } catch (error) {
      console.error('Failed to store tokens', error);
    }
  };

  // Refresh token
  const refreshToken = async (refreshToken: any) => {
    try {
      const response = await authAPI.refreshToken(refreshToken);
      await storeTokens(response.tokens);
      setAuthTokens(response.tokens);
      setUser(response.user);
      return true;
    } catch (error) {
      // If refresh fails, log out
      logout();
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      // Call logout API if needed
      await authAPI.logout(authTokens?.accessToken);
      // Clear stored credentials
      await SecureStore.deleteItemAsync('auth_tokens');
      setAuthTokens(null);
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Value object to be provided to consumers
  const authContextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshToken,
    getAccessToken: () => authTokens?.accessToken
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