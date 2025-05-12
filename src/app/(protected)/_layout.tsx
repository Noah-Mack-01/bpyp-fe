import { useAuth } from "@/src/providers/auth.provider";
import { ExerciseProvider } from "@/src/providers/exercise-api.provider";
import { Redirect, Slot, Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Appbar } from "react-native-paper";

export default function ProtectedLayout() {
  const authContext = useAuth();
  const router = useRouter();

  useEffect(() => {
      if (!!authContext.session) router.push({pathname: "/"});
  }, [authContext])

  return (!authContext.session) ? <Redirect href={"/login"}/> : (
    <ExerciseProvider>
      <Appbar.Header>
        {router.canGoBack() && <Appbar.BackAction onPress={router.back}></Appbar.BackAction>}
        <Appbar.Content title=""/>
        <Appbar.Action icon="logout" onPress={authContext.logout} />
      </Appbar.Header>
      <Slot />
    </ExerciseProvider>);
}