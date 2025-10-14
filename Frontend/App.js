import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import your screens
import LoginScreen from "./src/screens/Auth/login"; // Corrected the name
import SignUpScreen from "./src/screens/Auth/signUp";
import HomeScreen from "./src/screens/appScreen/Homescreen"; // Import the new home screen

const Stack = createNativeStackNavigator();

export default function App() {
  // In a real app, you'd have logic here to check if a user token exists
  // For now, we will keep the initial route as 'LogIn'
  // When a user successfully logs in from LoginScreen, you will navigate('Home')

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Screens for when the user is NOT logged in 🔒 */}
        <Stack.Screen name="LogIn" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* Screens for when the user IS logged in ✅ */}
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* You can add other main app screens here, like Profile, Settings, etc. */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
