import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../_layout";

const screenWidth = Dimensions.get("window").width;
const GRID_PADDING = 16;
const GRID_GAP = 8;
const GRID_COLS = 3;
const ITEM_SIZE = Math.floor(
  (screenWidth - GRID_PADDING * 2 - GRID_GAP * (GRID_COLS - 1)) / GRID_COLS
);
const userPhotos = [
  "https://picsum.photos/150/150?1",
  "https://picsum.photos/150/150?2",
  "https://picsum.photos/150/150?3",
  "https://picsum.photos/150/150?4",
  "https://picsum.photos/150/150?5",
  "https://picsum.photos/150/150?6",
];

export default function ProfileScreen() {
  const { logout } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.usernameText}>@jerin</Text>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="log-out-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileTop}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.fullName}>Jerin Thomas</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>895</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>180</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>
        </View>
      </View>
      <FlatList
        data={userPhotos}
        numColumns={GRID_COLS}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingHorizontal: GRID_PADDING,
          paddingTop: 12,
        }}
        columnWrapperStyle={{ justifyContent: "flex-start" }}
        renderItem={({ item, index }) => {
          const isLastInRow = (index + 1) % GRID_COLS === 0;
          return (
            <View
              style={[
                styles.photoWrapper,
                {
                  width: ITEM_SIZE,
                  height: ITEM_SIZE,
                  marginRight: isLastInRow ? 0 : GRID_GAP,
                },
              ]}
            >
              <Image
                source={{ uri: item }}
                style={styles.photoImage}
                resizeMode="cover"
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a" },
  header: {
    height: 60,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  usernameText: { fontWeight: "700", fontSize: 18, color: "#fff" },
  profileTop: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
    alignItems: "center",
  },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginRight: 18 },
  profileDetails: { flex: 1 },
  fullName: {
    fontWeight: "700",
    fontSize: 20,
    color: "#fff",
    marginBottom: 14,
  },
  statsRow: { flexDirection: "row", justifyContent: "space-around" },
  stat: { alignItems: "center" },
  statNumber: { fontWeight: "700", fontSize: 17, color: "#fff" },
  statLabel: { fontSize: 13, color: "#888", marginTop: 2 },
  photoWrapper: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: GRID_GAP,
  },
  photoImage: {
    width: "100%",
    height: "100%",
  },
});
