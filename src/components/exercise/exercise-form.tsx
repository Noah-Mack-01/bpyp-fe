import { Exercise } from "@/src/data/exercise";
import { Dispatch, SetStateAction, useState } from "react";
import { ScrollView, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import Picklist from "../shared/picklist";
import InputPickListCombo from "../shared/input-picklist-combo";

export function ExerciseForm(props: { exercise?: Exercise}) {

  const [exercise, setExercise]: [Exercise | undefined, Dispatch<SetStateAction<Exercise | undefined>>] = useState(props.exercise);
  return (
  <ScrollView contentContainerStyle={{width:"auto", margin: 10}}>
      <View style={{flexDirection: "row"}}>
        <TextInput label="Exercise" mode="outlined" value={exercise?.exercise}/>
        <TextInput label="Sets" mode="outlined" value={exercise?.sets?.toString()} />
        <InputPickListCombo/>
      </View>
  </ScrollView>
  ); 
}


function SearchSelect(props: { data: String[] }) {

}


const textInputStyle: any = {
 
}