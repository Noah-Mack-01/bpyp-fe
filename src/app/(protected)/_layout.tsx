import { useAuth } from "@/src/providers/auth.provider";
import { Redirect, Slot, Stack, useRouter } from "expo-router";
import React from "react";
import { Appbar } from "react-native-paper";

export default function ProtectedLayout() {
  const authContext = useAuth();
  const router = useRouter();
  return (!authContext.session) ? <Redirect href={"/login"}/> : (
    <>
      {/* Custom Appbar */}
      <Appbar.Header>
        {router.canGoBack() && <Appbar.BackAction onPress={router.back}></Appbar.BackAction>}
        <Appbar.Content title=""/>
        <Appbar.Action icon="logout" onPress={authContext.logout} />
        {}
      </Appbar.Header>

      {/* Render
 nested routes */}
      <Slot />
    </>);

}