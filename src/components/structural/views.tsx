import { VIEW_STYLES } from "@/src/styles/styles";
import { ReactNode } from "react";
import { ScrollView, useWindowDimensions, View, } from "react-native";

export const RowToColumnView = (props: {children: ReactNode[] | ReactNode, style?: any}) => {
  const scale = useWindowDimensions();
  return <View
    style={
    {...(scale.height > scale.width) ? 
      VIEW_STYLES.columnView : 
      VIEW_STYLES.rowView, 
      ...props.style}} 
    children={props.children}/>;
}

export const ColumnToRowView = (props: {children: ReactNode[] | ReactNode, style?: any}) => {
  const scale = useWindowDimensions();
  return <View
    style={
    {...(scale.height < scale.width) ? 
      VIEW_STYLES.columnView : 
      VIEW_STYLES.rowView, 
      ...props.style}} 
    children={props.children}/>;
}