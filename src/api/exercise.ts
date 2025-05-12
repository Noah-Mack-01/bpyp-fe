import axios from "axios";
import { CONFIG } from "../config";
import { Alert } from "react-native";
import { Exercise } from "../data/exercise";
import { supabase } from './supabase';

const apiClient = axios.create({
  baseURL: CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession()
  config.headers.Authorization = `Bearer ${data.session?.access_token ?? ''}`;
  return config;
})

export const exerciseAPI = ({
  getExercise: async (exerciseId: string) => {
    console.log(exerciseId);
    try {
    let result = await apiClient.get("/v1/exercises", { 
      params: { eid: exerciseId},
    });
    console.log(result)
    return result.data;
    
    } catch (error) {
      Alert.alert("Could not load exercise");
      console.error(error);
      return undefined;
    }
  },
  createNewExercise: async (exercise: Exercise) => {
    try {
      let result = await apiClient.post("/v1/exercises", exercise);
      return (result.status / 100 >= 200 && result.status / 100 < 300);
    } catch (error) {
      Alert.alert("Could not create item")
      console.error(error);
      return false;
    }
  },
  getStructuredExercise: async (message: string) => {
    let res: any;
    try {
      res = await apiClient.get("/v1/processor", { params: { message: message }});
    } catch (err) {
      console.error(err)
    } finally {
      return res;
    }
  },
});
