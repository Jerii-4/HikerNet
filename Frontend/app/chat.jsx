import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

const chatList = [
  {
    id: "chat1",
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    lastMessage: "See you at the summit!",
    time: "10:37 AM",
  },
];

export default function ChatListScreen() {
  const router = useRouter();
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textArea}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>&larr; Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={{ width: 60 }} />
      </View>
      <FlatList
        data={chatList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a" },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  textArea: { flex: 1 },
  chatName: { fontSize: 17, fontWeight: "700", color: "#fff" },
  lastMessage: { marginTop: 2, fontSize: 15, color: "#999" },
  time: { fontSize: 12, color: "#888" },
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
