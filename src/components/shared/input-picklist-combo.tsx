import { View } from "react-native";
import { TextInput } from "react-native-paper";
import PickList from "./picklist";

type InputPickListCombo = {
  onSelectedChange?: (event: Event)=>void
  labelFormatter: (str: String) => string
  pickListOptions: String[],
}

export default function InputPickListCombo(props: {}) {
  
  return (
    <View style={{flexDirection: "row"}}><TextInput mode="outlined" label={"test"}/><PickList values={["test1","test2"]} onChange={()=>{}}/></View>
  )
}