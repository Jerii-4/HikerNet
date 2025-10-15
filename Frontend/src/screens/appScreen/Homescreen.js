import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ route, navigation }) {
  const { user } = route.params || {};

  const handleLogout = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>HikerNet</Text>
        <Text style={styles.welcomeText}>
          Welcome, {user?.username || "Hiker"}
        </Text>
        <Text style={styles.subtitle}>Your adventure begins here</Text>

        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>🏔️</Text>
          <Text style={styles.placeholderSubtext}>
            Home content coming soon
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    letterSpacing: 1,
  },
  welcomeText: {
    fontSize: 24,
    color: "#4CAF50",
    fontWeight: "600",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#999",
    marginBottom: 60,
  },
  placeholderBox: {
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 50,
  },
  placeholderText: {
    fontSize: 64,
    marginBottom: 15,
  },
  placeholderSubtext: {
    color: "#999",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "#3a3a3a",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
