import { Exercise } from "@/src/data/exercise";
import { ReactNode, useState } from "react";
import { StyleSheet, Animated, View, ScrollView, ViewProps } from 'react-native';
import { Chip, List, Text } from "react-native-paper";
import { object } from "yup";

export const AnimatedAccordion = (props: {title: string, children: ReactNode | ReactNode[]}) => {
  // State to track if the button is active
  const [isActive, setIsActive] = useState(false);
  
  // Create animated value for border width
  const borderWidth = useState(new Animated.Value(1))[0];
  const height = useState(new Animated.Value(2))[0];
  // Handle click/tap
  const handlePress = () => {
    setIsActive(!isActive);
    
    // Animate border width
    Animated.timing(borderWidth, {
      toValue: isActive ? 1 : 10,
      duration: 300,
      useNativeDriver: false, // Border animations can't use native driver
    }).start();
    Animated.timing(height, {
      toValue: isActive ? 1: 300,
      duration: 300,
      useNativeDriver: false
    }).start()
  };
  
  return (
      <List.Accordion onPress={handlePress} title={props.title} children={
      <Animated.ScrollView
        style={{
          ...styles.container,
          height: height,
          borderTopWidth: borderWidth,
          borderTopColor: isActive ? '#DFDFDF' : 'transparent',
        }} children={props.children}
      />}/>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default AnimatedAccordion;
export function ListChild<T>(props: { object: T, func: (t: T) => ListProperties }, key: number) {
  const properties: ListProperties = props.func(props.object);
  const onClick = properties.onClick ? properties.onClick : () => {}
  return (
    <List.Item
      key={key}
      style={{ width: "100%" }}
      title={<Text numberOfLines={1} style={{ flexShrink: 1 }}>{properties.title}</Text>}
      description={properties.description}
      onPress={onClick}
      left={(style) => (
        <List.Icon
          style={{ ...style.style }}
          color={style.color}
          icon={properties.icon ?? "help"}
        />
      )}
      right={() => (
        <View 
          style={{
            flexDirection: "row",
            flexShrink: 0,
            minWidth: 120, // Space for 1.5 chips
            maxWidth: 200,
            justifyContent: "flex-end",
            marginLeft: 8,
          }}
        >
          {properties.tags && properties.tags.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end", // Align chips to the right
                paddingLeft: 4,
                paddingRight: 4,
                gap: 6,
                flex: 1,              
              }}
            >
              {properties.tags?.map((tag, index) => (
                <Chip 
                  key={index} 
                  style={{ marginHorizontal: 2 }}
                  compact={true}
                >
                  {tag}
                </Chip>
              ))}
            </ScrollView>
          ) : null}
        </View>
      )}
      titleStyle={{ marginRight: 8 }}
      descriptionStyle={{ marginRight: 8 }}
    />
  );
}
export type ListProperties = {
  title: string,
  description?: string,
  icon?: string
  tags?: string[]
  onClick?: (t: any)=>void
}