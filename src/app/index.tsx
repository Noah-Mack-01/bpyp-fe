import React, { ReactNode, useState } from "react";
import {Formik} from "formik";
import { ScrollView, Touchable, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { TextInput, Text, Appbar, useTheme, Icon, List, Divider} from "react-native-paper"
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { ExerciseGrid } from "../components/exercise/exercise-grid";
import { Link, Redirect, useNavigation, useRouter } from "expo-router";
import { ExerciseForm } from "../components/exercise/exercise-form";
export default function Index() {
  const[text, setText] = useState("");
  const[editing, setEditing]=useState(false);
  const router = useRouter()
  const scale = useWindowDimensions();
  const theme: ThemeProp = useTheme();
  return (
  <ScrollView style={{width: "98%", marginHorizontal: "1%", paddingTop:"1%"}}>
    {editing ? <ExerciseForm back={()=>{setEditing(false)}}/> : 
    smartInput(text, setText, theme, scale.width < scale.height ? ()=>{
      router.push("/exercise/")
      console.log("should've redirected");
      } : setEditing)}
    <Divider style={{marginTop: 20, marginBottom: 30}} bold={true}></Divider>
    <View>
      <Text variant="titleLarge">Today's Exercises</Text>
      <ExerciseGrid/>
    </View>
    <Divider style={{marginTop: 20, marginBottom: 30}} bold={true}></Divider>
    <View >
      <Text variant="titleLarge">Prior Workouts</Text>
      <List.Section >
        <List.Accordion style={{borderBottomWidth: 10, borderBottomColor:"#DFDFDF"}}title="06.01.2000">
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
  </ScrollView>);
}
function openEdit(func: (bool: boolean)=>void): ReactNode { return (
  <TouchableOpacity onPress={() => {
    func(true);
  }} style={{flexDirection:"row", alignItems:"flex-end"}}>
    <Text variant="titleMedium">manual entry </Text>
    <View><Icon source="menu-right" size={25}/></View>
  </TouchableOpacity>
); }

function smartInput(text: string, setText: (str: string)=>void, theme: ThemeProp, setEditing: (bool: boolean)=>void): ReactNode { 
  return (
    <View >
      <TextInput
        mode="outlined"
        onChangeText={text => setText(text)}
        placeholder='e.g. "5 by 10 weighted dips at 50lbs"'
        value={text}
        label="Enter exercise"
        style={{width: "100%" }}
        right={<TextInput.Icon icon="arrow-right-drop-circle" onPress={()=>{}} size={40} color={theme.colors?.primary}/>}
      />
      {openEdit(setEditing)}
    </View>); }