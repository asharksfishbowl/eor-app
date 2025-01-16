import React, { useEffect } from "react";
import {SplashScreen, Stack, useRouter} from "expo-router";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useFonts } from "expo-font";

function RootLayout() {
  const [loaded, error] = useFonts({
    'Silkscreen-Regular': require('../assets/fonts/Silkscreen-Regular.ttf'),
  });
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace("/(tabs)/campaign");
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [isAuthenticated, loading, router]);

  if (!loaded && !error) {
    return null;
  }

  if (loading) {
    return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
    );
  }

  return <Stack />;
}

export default function AppRoot() {
  return (
      <AuthProvider >
        <RootLayout />
      </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E", // Optional background color
  },
});
