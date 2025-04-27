import { DataProvider } from "@/src/providers/exercise-provider";
import { Stack, useLocalSearchParams } from "expo-router";

export default function ExerciseRoute() {
  const { exercise } = useLocalSearchParams();
  return (
    <DataProvider id={Number(exercise)}>
        <Stack screenOptions={{ headerTitle:"Exercise View", headerShown: true}}/>
    </DataProvider>
  );
}