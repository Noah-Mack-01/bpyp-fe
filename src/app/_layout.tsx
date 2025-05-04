import { Stack } from "expo-router";
import { DefaultTheme, PaperProvider } from "react-native-paper"
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { THEME } from "../styles/theme";
import { AuthProvider } from "../providers/auth.provider";
import { useContext } from "react";

export default function RootLayout() {
  
  const theme: ThemeProp = THEME 
  return (
      <PaperProvider theme={DefaultTheme}>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false}}>
            <Stack.Screen name="login/index"/>
            <Stack.Screen name ="(protected)"/>
          </Stack>
        </AuthProvider>
      </PaperProvider>
  );
}
