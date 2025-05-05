import { useAuth } from "@/src/providers/auth.provider";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  const authContext = useAuth();
  return (authContext.session) ? <Redirect href={`/?uId=${authContext.session.user.id}`}/> : <Stack />;
}