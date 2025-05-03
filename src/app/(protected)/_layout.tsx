import { AuthProvider, useAuth } from "@/src/providers/auth.provider";
import { useRoute } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { ReactNode } from "react";

export function ProtectedLayout() {
  const authContext = useAuth();
  const router = useRouter()
  if (!authContext.isAuthenticated) router.navigate("/login")
  return <Stack/>
}