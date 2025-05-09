import { ExerciseProvider } from "@/src/providers/exercise-api.provider";
import { Slot, Stack, useLocalSearchParams } from "expo-router";

export default function ExerciseRoute() {
  return (
        <Slot screenOptions={{ headerTitle:"Exercise View", headerShown: true}}/>
  );
}