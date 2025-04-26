import { useState } from "react";
import { ScrollView, View } from "react-native";
import { TextInput, Text, Appbar, useTheme, Icon, List, Divider} from "react-native-paper"
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { ExerciseGrid } from "../components/exercise/exercise-grid";
import { Link } from "expo-router";
export default function Index() {
  const[text, setText] = useState("");
  const theme: ThemeProp = useTheme();
  /*<Appbar.Header>
    <Appbar.Content title="Workout Log"></Appbar.Content>
  </Appbar.Header>*/
  return (<>
  <ScrollView
    contentContainerStyle={{
      width: "auto",
      display: "flex",
      justifyContent:"flex-start",
      margin: 10,
  }}>
    <View style={{alignItems:"flex-end"}}>
      <TextInput
        mode="outlined"
        onChangeText={text => setText(text)}
        placeholder='e.g. "5 by 10 weighted dips at 50lbs"'
        value={text}
        label="Enter exercise"
        style={{
          width: "100%",
        }}
        right={<TextInput.Icon 
          icon="arrow-right-drop-circle" onPress={()=>{}} 
          size={30} color={theme.colors?.primary}/>}/>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Link href={"/manual-input"}><Text style={{marginRight: -10}}variant="titleMedium">
          Manual Entry 
        </Text></Link>
        <View style={{}}>
          <Icon source="pan-right" size={35}/>
        </View>
      </View>
    </View>
    <View style={{}}>
      <Text variant="titleLarge">Today's Exercises</Text>
      <ExerciseGrid/>
      <Divider style={{marginVertical: 10}}/>
    </View>
    <View style={{}}>
      <Text variant="titleLarge">Prior Workouts</Text>
      <List.Section>
        <List.Accordion title="06.01.2000">
          <ExerciseGrid></ExerciseGrid>
        </List.Accordion>
        <List.Accordion title="06.01.2000">
          <ExerciseGrid></ExerciseGrid>
        </List.Accordion>
        <List.Accordion title="06.01.2000">
          <ExerciseGrid></ExerciseGrid>
        </List.Accordion>
        <List.Accordion title="06.01.2000">
          <ExerciseGrid></ExerciseGrid>
        </List.Accordion>
        <List.Accordion title="06.01.2000">
          <ExerciseGrid></ExerciseGrid>
        </List.Accordion>
        <List.Accordion title="06.01.2000">
          <ExerciseGrid></ExerciseGrid>
        </List.Accordion>
      </List.Section>
    </View>
  </ScrollView>
</>);
}
