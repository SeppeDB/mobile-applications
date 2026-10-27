import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useAuthStore } from "../src/state/useAuthStore";
import { colors } from "../src/theme";

export default function RootLayout() {
  const init = useAuthStore((state) => state.init);
  useEffect(() => init(), [init]);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Slot />
      </View>
    </SafeAreaProvider>
  );
}
