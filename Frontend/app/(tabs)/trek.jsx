import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const exploreTreks = [
  {
    id: "1",
    name: "Sunset Overlook",
    image: "https://picsum.photos/400/200?random=10",
    location: "Uttarakhand",
    favorited: false,
  },
  {
    id: "2",
    name: "River Valley Trek",
    image: "https://picsum.photos/400/200?random=11",
    location: "Sikkim",
    favorited: true,
  },
];

export default function TrekScreen() {
  const renderTrek = ({ item }) => (
    <View style={styles.trekCard}>
      <Image source={{ uri: item.image }} style={styles.trekImage} />
      <View style={styles.trekDetails}>
        <View style={styles.trekRow}>
          <Text style={styles.trekTitle}>{item.name}</Text>
          <TouchableOpacity>
            <Ionicons
              name={item.favorited ? "heart" : "heart-outline"}
              size={22}
              color={item.favorited ? "#e74c3c" : "#fff"}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.trekLocation}>
          <Ionicons name="location-outline" size={14} color="#999" />{" "}
          {item.location}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Explore Treks</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search treks..."
          placeholderTextColor="#999"
        />
      </View>
      <FlatList
        data={exploreTreks}
        renderItem={renderTrek}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feed}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a" },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderBottomColor: "#2a2a2a",
    borderBottomWidth: 1,
  },
  headerText: { color: "#fff", fontWeight: "bold", fontSize: 20 },
  searchContainer: {
    backgroundColor: "#1a1a1a",
    margin: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchInput: { flex: 1, fontSize: 15, color: "#fff" },
  feed: { paddingHorizontal: 12, paddingTop: 2, paddingBottom: 30 },
  trekCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    marginBottom: 22,
    overflow: "hidden",
  },
  trekImage: { width: "100%", height: 176 },
  trekDetails: { padding: 16 },
  trekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trekTitle: { fontWeight: "700", fontSize: 17, color: "#fff" },
  trekLocation: { marginTop: 3, fontSize: 13, color: "#999" },
});
