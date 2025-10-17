import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const dummyNotifications = [
  { id: "1", message: "John Doe liked your recent trek post.", time: "2h ago" },
  {
    id: "2",
    message: "Your friend Sara started following you.",
    time: "5h ago",
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>&larr; Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 60 }} />
      </View>
      <FlatList
        data={dummyNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a" },
  notificationItem: { paddingVertical: 12, paddingHorizontal: 16 },
  message: { fontSize: 16, color: "#fff" },
  time: { fontSize: 12, color: "#999", marginTop: 4 },
  separator: { height: 1, backgroundColor: "#2a2a2a" },
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
    backgroundColor: "#0a0a0a",
  },
  backText: { color: "#4CAF50", fontSize: 16 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
