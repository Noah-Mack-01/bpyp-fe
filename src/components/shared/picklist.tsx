import { PickListOption, PickListProps } from "@/src/data/picklist";
import { dismiss } from "expo-router/build/global-state/routing";
import React, { createRef, ReactNode, useRef, useState } from "react";
import { LayoutRectangle, View } from "react-native";
import { Menu, MenuProps, TextInput } from "react-native-paper";

export default function PickList(props: PickListProps): ReactNode {
  const values = props.options;
  const inputRef = createRef<View>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const onChange: (ev: PickListOption) => void = props.onSelectedChange ?? ((ev: PickListOption)=>{});
  const [picked, setPicked] = useState(props.options.find(item => item.default));
  
  const showMenu = () => {
    if (inputRef.current) {
      console.log(inputRef.current)
      // Measure the position of the TextInput in the window
      inputRef.current.measureInWindow((
        x: number, y: number, width:number, height:number) => {
        setMenuPosition({ x, y: y + height });
        setMenuVisible(true);
      });
    }
  };
  
  return (
    <View ref={inputRef} style={props.style}>
      <TextInput
        mode="outlined"
        label={props.label ?? "Select"}
        onChangeText={(evt)=>{}}
        onPointerDown={showMenu}
        value={picked?.label}
      />
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={menuPosition}
      >
        {values?.map((val, i) => (
          <Menu.Item 
            key={i} 
            title={val.label} 
            onPress={() => {
              setPicked(val);
              onChange(val);
              setMenuVisible(false);
            }}
          />
        ))}
      </Menu>
      </View>
  );
}

