import React from 'react'; 
import { StyleSheet, View } from "react-native";


export const VIEW_STYLES  = StyleSheet.create({
  mobileContainer: {
    width: "95%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems:"center"
  },
  desktopContainer: {
    width: "60%",
    flexDirection: "column",
    justifyContent:"flex-start",
    alignItems:"center"
  },
  rowView: {
    width: "100%",
    flexDirection:"row",
    justifyContent: "center",
    alignItems:"center",
    flexWrap:"wrap"
  },
  columnView: {
    width: "100%",
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"center"
  }
})