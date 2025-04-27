import { ReactNode } from "react";
import { ScrollView, useWindowDimensions, View, ViewStyle } from "react-native"

export default function ConditionalView(props: {children: ReactNode[] | ReactNode}): ReactNode {
  const scale = useWindowDimensions()
  const style: ViewStyle = {...(scale.width > 1500 ? {width:"60%"}:{width:"95%"})}
  return (
<ScrollView
    contentContainerStyle={{
      width: "auto",
      display: "flex",
      justifyContent:"flex-start",
      alignItems:"center",
      margin: 10,
  }}>
  <View style={style}>{props.children}</View></ScrollView>
  )
}
