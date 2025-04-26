import { DataTable } from "react-native-paper";
import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { Exercise, SAMPLE } from "@/src/data/exercise";

export function ExerciseGrid(): ReactNode {
return (
<ScrollView contentContainerStyle={{flex: 1, minWidth:1000}} horizontal>
  <DataTable >
  <ExerciseHeaderRow></ExerciseHeaderRow>
  <TimestampedRows exercise={SAMPLE}/>
</DataTable>
</ScrollView>); 
}
function ExerciseHeaderRow() { return (
            <DataTable.Header>
              <DataTable.Title>Exercise</DataTable.Title>
              <DataTable.Title>Sets</DataTable.Title>
              <DataTable.Title>Work</DataTable.Title>
              <DataTable.Title>Resistance</DataTable.Title>
              <DataTable.Title >Time</DataTable.Title>
            </DataTable.Header>
  
)}
function TimestampedRows(props: { exercise: Exercise[]}) {
  return (props.exercise.map(exercise => 
    <DataTable.Row key={exercise.text+exercise.timeStamp.toISOString()} children={mapExerciseToNode(exercise)}/>
  ));
}


function mapExerciseToNode(exercise: Exercise): ReactNode {
  return (<DataTable.Row style={{minWidth:1000, flex:1, padding: 0}}>
    <DataTable.Cell>{exercise.exercise}</DataTable.Cell>
    {exercise.sets ? <DataTable.Cell >{exercise.sets}</DataTable.Cell>:<PlaceHolder/>}
    {exercise.work ? <DataTable.Cell >{[exercise.work, exercise.workUnit].join(" ")}</DataTable.Cell>:<PlaceHolder/>}
    {exercise.resistance ? <DataTable.Cell >{[exercise.resistance, exercise.resistanceUnits].join(" ")}</DataTable.Cell>:<PlaceHolder />}
    <DataTable.Cell >{exercise.timeStamp.toLocaleTimeString()}</DataTable.Cell>
  </DataTable.Row>)
}

function PlaceHolder():ReactNode{
  return <View style={{flex:1, padding:0}}></View>
}