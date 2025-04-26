import { dismiss } from "expo-router/build/global-state/routing";
import { ReactNode, useState } from "react";
import { View } from "react-native";
import { Menu, MenuProps, TextInput } from "react-native-paper";

export type PickListProps = {
  onChange: (event: any) => void;
  values: string[];
  label?: string;
  default?: string;
}

export default function PickList(props: PickListProps): ReactNode {
  const values = props.values; 
  const df = props.default ?? values?.[0] ?? "";
  const [picked, setPicked] = useState(df);
  const [picking, setPicking] = useState(false);
  return (
    <Menu
      anchorPosition="bottom" 
      onDismiss={()=>setPicking(false)}
      anchor={
        <TextInput
          mode="outlined"
          label={"PickList"}
            onChangeText={(evt)=>{
              setPicking(true);
              setPicked(evt)
            }}
            onPointerDown={()=>{
              setPicking(true)
            }}
          value={picked}/>
          }
          visible={picking} 
          children={values?.map(
            (val, i)=> <Menu.Item 
              key={i} 
              title={val} 
              onPress={()=>{
                setPicked(val)
              }}/>
          )}>
    </Menu>)
}