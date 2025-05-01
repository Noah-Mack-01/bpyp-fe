import { PickListOption, PickListProps } from "@/src/data/inputs";
import { dismiss } from "expo-router/build/global-state/routing";
import React, { createRef, ReactNode, useRef, useState, useEffect } from "react";
import { LayoutRectangle, useWindowDimensions, View } from "react-native";
import { Menu, MenuProps, TextInput } from "react-native-paper";

// Updated PickListProps interface to support Formik
export interface EnhancedPickListProps extends PickListProps {
  selectedValue?: string;
  onSelectChange?: (value: string) => void;
  error?: boolean;
}

export function PickList(props: EnhancedPickListProps): ReactNode {
  const inputRef = createRef<View>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  
  // Find initially selected option
  const initialOption = props.selectedValue 
    ? props.options.find(item => item.value === props.selectedValue)
    : props.options.find(item => item.default);
    
  const [picked, setPicked] = useState(initialOption);
  
  // Update picked when selectedValue changes from external source (Formik)
  useEffect(() => {
    if (props.selectedValue) {
      const option = props.options.find(item => item.value === props.selectedValue);
      if (option && option !== picked) {
        setPicked(option);
      }
    }
  }, [props.selectedValue]);
  
  const showMenu = () => {
    if (inputRef.current) {
      // Measure the position of the TextInput in the window
      inputRef.current.measureInWindow((
        x: number, y: number, width: number, height: number) => {
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
        onPointerDown={showMenu}
        value={picked?.label}
        error={props.error}
        disabled={props.disabled}
      />
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={menuPosition}>
        {props.options?.map((val, i) => (
          <Menu.Item
            key={i}
            title={val.label}
            onPress={() => {
              setPicked(val);
              // Call original callback if provided
              if (props.onSelectedChange) {
                props.onSelectedChange(val);
              }
              // Call Formik callback with value
              if (props.onSelectChange) {
                props.onSelectChange(val.value);
              }
              setMenuVisible(false);
            }}
          />
        ))}
      </Menu>
    </View>
  );
}

export const FixedWidthInput = (props: {
  label: string, 
  value: any, 
  onChangeText?: (text: string) => void,
  onBlur?: () => void,
  error?: boolean,
  disabled?: boolean,
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad"
}) => {
  const scale = useWindowDimensions();
  return (
    <TextInput 
      style={{width: Math.min(scale.width, 300)}} 
      label={props.label} 
      mode="outlined" 
      value={props.value}
      onChangeText={props.onChangeText}
      onBlur={props.onBlur}
      error={props.error}
      disabled={props.disabled}
      keyboardType={props.keyboardType || "default"}
    />
  );
};

// Updated InputPickListCombo to work with Formik
export function InputPickListCombo(props: EnhancedPickListProps & {
  value?: string,
  onChangeText?: (text: string) => void,
  onBlur?: (args: any) => void,
  disabled?: boolean,
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad"
}) {
  const scale = useWindowDimensions();
  
  // Find initial units display
  const initialUnit = props.selectedValue 
    ? props.options.find(item => item.value === props.selectedValue)
    : props.options.find(item => item.default);
  
  const [affix, setAffix] = useState(initialUnit?.label);
  
  // Update affix when selectedValue changes
  useEffect(() => {
    if (props.selectedValue) {
      const option = props.options.find(item => item.value === props.selectedValue);
      if (option) {
        setAffix(option.label);
      }
    }
  }, [props.selectedValue]);
  
  return (
    <View style={{flexDirection: "row", gap: 5, maxWidth: Math.min(scale.width, 300), ...props.style}}>
      <TextInput 
        style={{flex:2}} 
        mode="outlined" 
        label={props.label}
        right={<TextInput.Affix text={"(" + affix + ")"}/>}
        value={props.value}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        error={props.error}
        disabled={props.disabled}
        keyboardType={props.keyboardType || "default"}
      />
      <PickList 
        style={{flex:1}} 
        options={props.options}
        onSelectedChange={(ev) => {
          setAffix(ev.label);
          // Pass through to original handler if it exists
          if (props.onSelectedChange) {
            props.onSelectedChange(ev);
          }
        }}
        selectedValue={props.selectedValue}
        onSelectChange={props.onSelectChange}
        label={props.selectLabel}
        error={props.error}
        disabled={props.disabled}
      />
    </View>
  );
}