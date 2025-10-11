import React, { useState } from "react";
// Make sure you import the components you need
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import apiClient from "../../Api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your component receives the 'navigation' prop automatically from the stack navigator
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // ... your existing login logic
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        // ... other props
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />

      {/* --- THIS IS THE FIX --- */}
      {/* Add this button to navigate to the SignUp screen */}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Don't have an account? Sign Up"
          // This tells the navigator to go to the screen named "SignUp"
          onPress={() => navigation.navigate("SignUp")}
          color="#666" // Optional: makes the button look secondary
        />
      </View>
      {/* ---------------------- */}
    </View>
  );
};

// Add some basic styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
});

export default LoginScreen;
