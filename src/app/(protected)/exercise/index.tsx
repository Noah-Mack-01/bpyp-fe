import { ExerciseForm } from "@/src/components/exercise/exercise-form"
import { Exercise } from "@/src/data/exercise"
import { useAuth } from "@/src/providers/auth.provider"
import { useExerciseApi } from "@/src/providers/exercise-api.provider"
import { useRouter } from "expo-router"
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { ActivityIndicator, Banner, Text } from "react-native-paper"
export default function TestDir() {
  const exerciseApi = useExerciseApi();
  const [showBanner, setShowBanner] = useState(!!exerciseApi.error);
  const res = useLocalSearchParams();
  const { exercise = "" } = useLocalSearchParams(); // Pull query parameters
  const [exerciseBody, setExercise] = useState<Exercise | null>(null);
  const authContext = useAuth()
  useEffect(()=>{
    setShowBanner(!!exerciseApi.error) 
  }, [exerciseApi]);

  useEffect(() => {
    console.log(res)
    const fetch = async () => { 
      const found = await exerciseApi.getExercise(exercise as string);
      setExercise(found ?? null);
      console.log(found)
      console.log(exerciseBody)
    };
    fetch()
  }, []) // these values should never change.

  return (
    <View>
      <Banner visible={showBanner} actions={[{label: "OK", onPress: () => setShowBanner(false)}]} children={<Text>{exerciseApi.error}</Text>}></Banner>
      <ActivityIndicator animating={!!exerciseApi.loading}/>
      <ExerciseForm exercise={exerciseBody ?? undefined}/>
    </View>);
}