import { ExerciseForm } from "@/src/components/exercise/exercise-form";
import { Exercise } from "@/src/data/exercise";
import { useLocalSearchParams } from "expo-router";
import { Dispatch, SetStateAction, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

export default function ExistingWorkout() {
  const { workoutId } = useLocalSearchParams();
  return <ExerciseForm exercise={undefined}/>
}