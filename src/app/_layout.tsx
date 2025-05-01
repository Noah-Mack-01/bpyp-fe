import { Stack } from "expo-router";
import { DefaultTheme, PaperProvider } from "react-native-paper"
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { THEME } from "../styles/theme";

export default function RootLayout() {
  
  const theme: ThemeProp = THEME 
  return (
      <PaperProvider theme={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false}}/>
      </PaperProvider>
  );
}
