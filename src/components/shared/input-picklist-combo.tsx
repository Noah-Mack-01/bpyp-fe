import { StyleProp, useWindowDimensions, View, ViewStyle } from "react-native";
import { TextInput } from "react-native-paper";
import PickList from "./picklist";
import { useState } from "react";
import { PickListOption, PickListProps } from "@/src/data/picklist";
import { loadOptions } from "@babel/core";


export default function InputPickListCombo(props: PickListProps) {
  const pickListOption = props.options.find(item => item.default)
  const scale = useWindowDimensions();
  const [affix, setAffix] = useState(pickListOption?.label);
  let style: ViewStyle = {
    ...props.style, 
    flexDirection:  "row",
    gap: 10,
    maxWidth: 300
  };

  return (
    <View style={style}>
      <TextInput style={{flex:2}}mode="outlined" label={props.label} right={<TextInput.Affix text={"(" + affix+")"}/>}/>
      <PickList style={{flex:1}} options={props.options} onSelectedChange={(ev)=>setAffix(ev.label)} label={props.selectLabel}/>
    </View>
  )
}

