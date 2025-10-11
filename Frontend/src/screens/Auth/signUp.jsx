import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import apiClient from "../../Api/api"; // Make sure the path is correct

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      // Your API call to the backend to create the user
      await apiClient.post("/signup", {
        username,
        email,
        password,
      });

      // --- THIS IS THE FIX ---
      // Show a success message
      Alert.alert("Success!", "Your account has been created. Please log in.");

      // Navigate to the Login screen
      navigation.navigate("LogIn");
      // ----------------------
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response?.data?.msg || "An error occurred"
      );
      Alert.alert(
        "Signup Failed",
        error.response?.data?.msg || "An unexpected error occurred."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      {/* ...your TextInput components for username, email, and password... */}
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

// ...your styles
export default SignUpScreen;
