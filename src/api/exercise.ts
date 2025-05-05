import axios from "axios";
import { CONFIG } from "../config";
import { Alert } from "react-native";
import { Exercise } from "../data/exercise";

const apiClient = axios.create({
  baseURL: CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const exerciseAPI  = {
  getExercise: async (userId: string, exerciseId: string) => {
    console.log(userId, exerciseId);
    try {
    let result = await apiClient.get("/v1/exercises", { 
      params: {uid: userId, eid: exerciseId},
    });
    console.log(result)
    return result.data;
    
    } catch (error) {
      Alert.alert("Could not load exercise");
      console.error(error);
      return undefined;
    }
  },
  createNewExercise: async (userId: string, exercise: Exercise) => {
    try {
      let result = await apiClient.post("/v1/exercises", exercise, { params: {uid: userId} });
      return (result.status / 100 >= 200 && result.status / 100 < 300);
    } catch (error) {
      Alert.alert("Could not create item")
      console.error(error);
      return false;
    }
  }
}
export async function getExerciseSummary(userId: string) {
  let res: any;
  try {
    res = await apiClient.get("/v1/exercises", {params: { uid: userId}})
  } catch (err) {
    console.error(err);
  } finally {
    console.log(res);
    return res;
  }
}