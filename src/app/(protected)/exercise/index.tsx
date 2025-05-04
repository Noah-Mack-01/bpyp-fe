import { ExerciseForm } from "@/src/components/exercise/exercise-form"
import { getExerciseDetail } from "@/src/providers/exercise-detail.provider"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { ActivityIndicator, Banner, Text } from "react-native-paper"
export default function TestDir() {
  const router = useRouter()
  const { exercise, loading, error, submit} = getExerciseDetail()
  const [showBanner, setShowBanner] = useState(!!error);
  useEffect(()=>{
    setShowBanner(!!error)
    console.log(showBanner)
  }, [error]);
  return (
    <View>
      <Banner visible={showBanner} actions={[{label: "OK", onPress: () => setShowBanner(false)}]} children={<Text>{error}</Text>}></Banner>
      <ActivityIndicator animating={!!loading}/>
      <ExerciseForm exercise={exercise??undefined}/>
    </View>);
}