import { ExerciseForm } from "@/src/components/exercise/exercise-form";
import { useData } from "@/src/providers/exercise-provider";

export default function ExistingWorkout() {
  const { exercise, loading, error } = useData()
  return <ExerciseForm exercise={undefined}/>
}