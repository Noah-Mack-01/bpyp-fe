import { Exercise } from "@/src/data/exercise";
import { Dispatch, SetStateAction, useState } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Picklist from "../shared/picklist";
import InputPickListCombo from "../shared/input-picklist-combo";
import ConditionalView from "../shared/conditional-view";
import { PickListOption } from "@/src/data/picklist";

export function ExerciseForm(props: { exercise?: Exercise}) {
  const dimensions = useWindowDimensions()
  const [exercise, setExercise]: [Exercise | undefined, Dispatch<SetStateAction<Exercise | undefined>>] = useState(props.exercise);
  const longFixedWidth = 200
  return (<ConditionalView>
    <View style={{flexDirection: dimensions.width > 1500 ? "row" : "column", flexWrap: "wrap", width:"100%", gap:10, justifyContent:"flex-start", alignItems:"center"}}>
      <View style={{flexDirection: "row", gap: 10, width: 300}}><TextInput style={{flex: 2}} label="Exercise" mode="outlined" value={exercise?.exercise}/>
      <TextInput style={{flex: 1}} label="Sets" mode="outlined" value={exercise?.sets?.toString()} /></View>
      <InputPickListCombo style={{}} options={RESISTANCE_OPTIONS} label="Resistance" selectLabel="Units"/>
      <InputPickListCombo style={{}} options={QUANTITY_OPTIONS} label="Quantity / Distance" selectLabel="Units"/>
      {isAerobic(exercise) && <InputPickListCombo style={{}} options={DURATION_OPTIONS} label="Duration" selectLabel="Units"/>}
      <View style={{flexDirection:"row", width:300, gap: 10}}><Button style={{flex:1}}mode="elevated">Submit</Button>
      <Button style={{flex:1}} mode="outlined">Reset</Button></View>
    </View>
  </ConditionalView>); 
}

function isAerobic(exercise?: Exercise):boolean { return false;}

const textInputStyle: any = {}
const DURATION_OPTIONS = [
  { label: 'mins', value: 'minutes', default: true},
  { label: 'hours', value: 'hours', default: false},
  { label: 'seconds', value: 'seconds', default: false}
]

const RESISTANCE_OPTIONS: PickListOption[] = [
  { label: 'kg', value: 'kg', default: false},
  { label: 'lbs', value: 'pounds', default: true }
]

const QUANTITY_OPTIONS: PickListOption[] = [
  {label: 'reps', value: 'reps', default: true},
  {label: 'miles', value: 'miles', default: false},
  {label: 'steps', value: 'steps', default: false},
  {label: 'km', value: 'km', default: false},
] 