import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../_layout"; // Use our central auth hook
import apiClient from "../../api/apiClient";
import SocialButton from "../../components/SocialButton";

const googleLogo = require("../../assets/icons/google.png");
const appleLogo = require("../../assets/icons/apple.png");

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, googleLogin } = useAuth();

  const handleEmailLogin = async () => {
    setError("");
    if (!identifier || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await apiClient.post("/login", { identifier, password });
      if (response.data.token) {
        login(response.data.token);
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.logo}>HikerNet</Text>
          <Text style={styles.subtitle}>Welcome back</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email or Username"
              placeholderTextColor="#999"
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
            />
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((s) => !s)}
                style={styles.showPasswordBtn}
              >
                <Text style={{ color: "#4CAF50", fontWeight: "700" }}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleEmailLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>
            <SocialButton
              logo={appleLogo}
              text="Continue with Apple"
              onPress={() => {}}
            />
            <SocialButton
              logo={googleLogo}
              text="Continue with Google"
              onPress={() => googleLogin()}
            />
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>New to HikerNet? </Text>
              <TouchableOpacity onPress={() => router.push("/(Auth)/signUp")}>
                <Text style={styles.signupLink}>Join now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a" },
  scrollContent: { flexGrow: 1, justifyContent: "center" },
  content: { paddingHorizontal: 30 },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
    marginBottom: 50,
  },
  form: { width: "100%" },
  input: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    color: "#fff",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  signupText: { color: "#999", fontSize: 15 },
  signupLink: { color: "#4CAF50", fontSize: 15, fontWeight: "600" },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#2a2a2a" },
  dividerText: { color: "#999", marginHorizontal: 15, fontSize: 14 },
  passwordRow: { flexDirection: "row", alignItems: "center" },
  showPasswordBtn: { marginLeft: 8, paddingHorizontal: 6 },
});
