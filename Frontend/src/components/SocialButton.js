// File: src/components/SocialButton.jsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";

const SocialButton = ({ logo, text, onPress }) => {
  return (
    // This is just a pressable box
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      {/* The picture goes on the left */}
      <Image source={logo} style={styles.logo} />
      {/* The words go next to the picture */}
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

// These are the style rules to make it match your app
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row", // Puts the picture and text side-by-side
    alignItems: "center",
    backgroundColor: "#1a1a1a", // Same as your input fields
    borderRadius: 12, // Same as your input fields
    paddingVertical: 14, // A little less padding than the main button
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a", // Same as your input fields
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16, // A little smaller than your main button text
    fontWeight: "500", // A bit lighter than your main button text
  },
});

export default SocialButton;
