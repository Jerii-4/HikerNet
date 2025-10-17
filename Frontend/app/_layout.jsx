import React, { useState, useEffect, createContext, useContext } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

// This is our central "toolbox" for authentication.
const AuthContext = createContext(null);

// A simple hook to grab our tools from anywhere in the app.
export function useAuth() {
  return useContext(AuthContext);
}

// The component that provides all the auth tools to the app.
function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // This tool checks if the user is already logged in when the app starts.
  useEffect(() => {
    const checkIsLoggedIn = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setUserToken(token); // Set initial value
      } catch (e) {
        console.log("Error checking login status:", e);
      } finally {
        setIsLoading(false); // We're done checking, so stop loading.
      }
    };
    checkIsLoggedIn();
  }, []);

  const login = async (token) => {
    setUserToken(token);
    await AsyncStorage.setItem("userToken", token);
  };

  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem("userToken");
  };

  const value = {
    login,
    logout,
    userToken,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// The main navigation logic that decides where to send the user.
function RootLayoutNav() {
  const { userToken, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // This is the new, safer "security guard".
  useEffect(() => {
    // 1. Wait until we're done checking for a token AND the router is ready.
    // The segments.length > 0 check is the "go" signal from the router.
    if (isLoading || segments.length === 0) {
      return; // Do nothing until both are ready.
    }

    // Normalize the first segment to lowercase so we don't depend on folder name casing.
    const firstSegment = (segments[0] || "").toLowerCase();
    const inAuthGroup =
      firstSegment === "(auth)" || firstSegment === "(auth)".toLowerCase();

    // 2. If the user IS logged in, but is on an auth screen -> send to tabs.
    if (userToken && inAuthGroup) {
      // ...force them to the main app's home screen.
      // Use the actual folder name for tabs group as defined in the filesystem ("(tabs)").
      router.replace("/(tabs)");
    }
    // 3. If the user is NOT logged in and is trying to access the main app...
    else if (!userToken && !inAuthGroup) {
      // ...force them to the login screen.
      // Match the actual auth group folder name which is `(Auth)` (capital A).
      router.replace("/(Auth)/login");
    }
  }, [userToken, isLoading, segments]); // This now runs safely.

  // While we are checking for the token, just show a loading screen.
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  // Once loading is done, render the main navigator. The useEffect above will handle the redirect safely.
  return (
    <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="(Auth)" />
      <Stack.Screen name="(tabs)" />
      {/* Your other screens like chat, notifications, modal will be handled here correctly */}
    </Stack>
  );
}

// The final component that wraps our entire app.
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
