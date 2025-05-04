// src/api/auth.js
import axios from 'axios';
import { CONFIG } from '../config';
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, AppState, Platform } from 'react-native';
import { Credentials } from '../data/auth';
  
const apiClient = axios.create({
  baseURL: CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

class SupabaseStorage {
  async getItem(key: string) {
    if (Platform.OS === "web") {
      if (typeof localStorage === "undefined") {
        return null;
      }
      return localStorage.getItem(key);
    }
    return AsyncStorage.getItem(key);
  }
  async removeItem(key: string) {
    if (Platform.OS === "web") {
      return localStorage.removeItem(key);
    }
    return AsyncStorage.removeItem(key);
  }
  async setItem(key: string, value: string) {
    if (Platform.OS === "web") {
      return localStorage.setItem(key, value);
    }
    return AsyncStorage.setItem(key, value);
  }
}

export const supabase = createClient(
  CONFIG.SUPABASE_URL,
  CONFIG.SUPABASE_ANON_KEY,
  {
    auth: {
      storage: new SupabaseStorage(),
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    }
  }
)

AppState.addEventListener('change', (state) => {  
  if (state === 'active') supabase.auth.startAutoRefresh();
  else supabase.auth.stopAutoRefresh() 
});



const authAPI = {
  login: async (credentials?: Credentials) => {
    if (!credentials) {
      Alert.alert('Login failed', 'Credentials were null')
    }
    else {
      const { error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      })
      if (!!error) Alert.alert('Login failed', error.message)
    }
  },
  
  register: async (credentials?: Credentials) => {
    if (!credentials) Alert.alert('Login failed', 'Credentials were null')
    else {
      const { error, data: { session } } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password
      })
      if (!!error) Alert.alert('Registration failed', error.message); 
      if (!session) Alert.alert('Please check your inbox for email verification!')
    }
  },
  
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (!!error) Alert.alert('Logout failed', error.message);
  },
  
  // Other auth-related API calls
};

export default authAPI;