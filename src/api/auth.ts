// src/api/auth.js
import axios from 'axios';
import { CONFIG } from '../config';
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, AppState, Platform } from 'react-native';
import { Credentials } from '../data/auth';
  

class SupabaseStorage {
  async getItem(key: string) {
    let isWeb = Platform.OS == "web";
    if (isWeb && typeof localStorage == "undefined") return null;
    let storage = (isWeb) ? localStorage : AsyncStorage;
    return storage.getItem(key);
  }
  async removeItem(key: string) {
    let isWeb = Platform.OS == "web";
    if (isWeb && typeof localStorage == "undefined") return;
    let storage = (isWeb) ? localStorage : AsyncStorage;
    storage.removeItem(key);
  }

  async setItem(key: string, value: string) {
    let isWeb = Platform.OS == "web";
    if (isWeb && typeof localStorage == "undefined") return;
    let storage = (isWeb) ? localStorage : AsyncStorage;
    storage.setItem(key, value);
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