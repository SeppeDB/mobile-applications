import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useAuthStore } from "../src/state/useAuthStore";

export default function RootLayout() {
  const init = useAuthStore((state) => state.init);
  useEffect(() => init(), [init]);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Slot />
    </SafeAreaProvider>
  );
}
