import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    // Clear the token from storage
    await AsyncStorage.removeItem("userToken");
    // This is a common pattern to 'restart' the app navigation state
    // You would typically use a context or state management to handle this switch
    // For now, we can navigate back to the auth flow
    navigation.navigate("LogIn");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App! 🚀</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, marginBottom: 20 },
});

export default HomeScreen;
