import React, { ReactNode, useEffect, useState } from "react";
import { ScrollView, Touchable, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { TextInput, Text, Appbar, useTheme, Icon, List, Divider} from "react-native-paper"
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { useRouter } from "expo-router";
import { ExerciseForm } from "../../components/exercise/exercise-form";
import AnimatedAccordion, { ListChild } from "../../components/shared/lists";
import { Exercise, exerciseToListItem } from "../../data/exercise";
import { useExerciseApi } from "@/src/providers/exercise-api.provider";
export default function Index() {
  const[text, setText] = useState("");
  const[editing, setEditing]=useState(false);
  const router = useRouter()
  const apiContext = useExerciseApi()
  const scale = useWindowDimensions();
  const theme: ThemeProp = useTheme();


  const [rows, setRows] = useState([] as Exercise[]);

  useEffect(()=>{
    let func = async () => {
      let res = await apiContext.getAllExercises();
      setRows(res ?? []);
    }
    func()
  }, [])


  
  const openEdit = (func: (bool: boolean)=>void): ReactNode => { return (
    <TouchableOpacity onPress={() => {
      func(true);
    }} style={{flexDirection:"row", alignItems:"flex-end"}}>
      <Text variant="titleMedium">manual entry </Text>
      <View><Icon source="menu-right" size={25}/></View>
    </TouchableOpacity>
  ); }

  const smartInput = (text: string, theme: ThemeProp): ReactNode => { 
    return (
      <View>
        <TextInput
          mode="outlined"
          onChangeText={text => setText(text)}
          placeholder='e.g. "5 by 10 weighted dips at 50lbs"'
          value={text}
          label="Enter exercise"
          style={{width: "100%" }}
          right={<TextInput.Icon icon="arrow-right-drop-circle" onPress={()=>{
            apiContext.getStructure(text);
            setText("")
          }} size={40} color={theme.colors?.primary}/>}
        />
        {openEdit(scale.width < scale.height ? (b: boolean) => router.push(`/exercise?`) : setEditing)}
      </View>
    ); 
  }

  return (
    <ScrollView style={{width: "99%", marginLeft: "1%", paddingRight:"3%",paddingTop:"1%"}}>
      {editing ? <ExerciseForm back={()=>{setEditing(false)}}/> : 
      smartInput(text, theme)} 
      <Divider style={{marginTop: 20, marginBottom: 30}} bold={true}/>
      <Text variant="titleLarge">Today's Exercises</Text>
      <List.Section>
        <ScrollView style={{maxHeight: 300}}>
          {rows.map((ex, key) => <ListChild key={key} object={ex} func={(item)=>({...exerciseToListItem(item), onClick: () => router.push(`/exercise?user=test&exercise=${ex.id}`)})}/>)}
        </ScrollView>
      </List.Section>
      <Divider style={{marginTop: 20, marginBottom: 30}} bold={true}></Divider>
    </ScrollView>
    );
}