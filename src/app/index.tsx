import { useState } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { TextInput, Text, Appbar, useTheme, Icon, List, Divider} from "react-native-paper"
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { ExerciseGrid } from "../components/exercise/exercise-grid";
import { Link } from "expo-router";
import ConditionalView from "../components/shared/conditional-view";
export default function Index() {
  const[text, setText] = useState("");
  const scale = useWindowDimensions();
  const theme: ThemeProp = useTheme();
  /*<Appbar.Header>
    <Appbar.Content title="Workout Log"></Appbar.Content>
  </Appbar.Header>*/
  return (
  <ConditionalView>
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
          size={30} color={theme.colors?.primary}/>}/><Link href={"/manual-input"}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{marginRight: -5, marginTop: 0}}variant="titleMedium">
          manual entry 
        </Text>
        <View style={{marginTop: 2}}>
          <Icon source="menu-right" size={20}/>
        </View>
      </View></Link>
    </View>
    <View style={{}}>
      <Text variant="titleLarge">Today's Exercises</Text>
      <ExerciseGrid/>
      <Divider style={{marginVertical: 10}}/>
    </View>
    <View style={{}}>
      <Text variant="titleLarge">Prior Workouts</Text>
      <List.Section style={{}}>
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
  </ConditionalView>
);
}
