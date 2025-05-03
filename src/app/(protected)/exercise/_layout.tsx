import { ExerciseDetailProvider } from "@/src/providers/exercise-detail.provider";
import { Stack, useLocalSearchParams } from "expo-router";

export default function ExerciseRoute() {
  let { user, exercise } = useLocalSearchParams();
  let exerciseId: string = (Array.isArray(exercise) && exercise.length > 0 ? exercise[0] : exercise) as string;
  let userId: string = (Array.isArray(user)  && user.length > 0 ? user[0] : user) as string
  return (
    <ExerciseDetailProvider uId={userId} eId={exerciseId}>
        <Stack screenOptions={{ headerTitle:"Exercise View", headerShown: true}}/>
    </ExerciseDetailProvider>
  );
}