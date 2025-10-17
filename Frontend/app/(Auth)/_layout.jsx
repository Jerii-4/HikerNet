import { Stack } from "expo-router";

// This simply defines the (auth) group as a separate navigation stack.
export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
