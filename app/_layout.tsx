import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
// import "react-native-reanimated";
import GameContextProvider from "@/context/gameContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Chawp: require("../assets/fonts/chawp.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GameContextProvider>
      <Stack
        initialRouteName="menu"
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        <Stack.Screen name="menu" />
        <Stack.Screen name="difficulty" />
        <Stack.Screen name="loading" />
        <Stack.Screen name="game" />
        <Stack.Screen name="table/[number]" />
      </Stack>
      <StatusBar style="dark" />
    </GameContextProvider>
  );
}
