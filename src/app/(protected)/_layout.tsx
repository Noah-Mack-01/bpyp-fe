import { useAuth } from "@/src/providers/auth.provider";
import { Redirect, Stack, useRouter } from "expo-router";

export default function ProtectedLayout() {
  const authContext = useAuth();
  return (!authContext.session) ? <Redirect href={"/login"}/> : <Stack />;
}