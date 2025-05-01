import { DataProvider } from "@/src/providers/exercise-provider";
import { Stack, useLocalSearchParams } from "expo-router";

export default function ExerciseRoute() {
  let { exercise } = useLocalSearchParams();
  let id: string = Array.isArray(exercise) && exercise.length > 0 ? exercise[0] : String(exercise);
  return (
    <DataProvider id={id}>
        <Stack screenOptions={{ headerTitle:"Exercise View", headerShown: true}}/>
    </DataProvider>
  );
}