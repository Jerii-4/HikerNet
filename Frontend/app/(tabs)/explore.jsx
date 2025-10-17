import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";

const newTreksNearYou = [
  {
    id: "t1",
    name: "Alpine Ridge Trail",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    region: "Sikkim",
  },
  {
    id: "t2",
    name: "Sunset Valley Hike",
    image:
      "https://images.unsplash.com/photo-1465101178521-c1a9136a03f6?auto=format&fit=crop&w=400&q=80",
    region: "Uttarakhand",
  },
];
const strangerPosts = [
  {
    id: "p1",
    username: "expeditionErik",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    image: "https://picsum.photos/380/340?random=100",
  },
  {
    id: "p2",
    username: "hiker_sara",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    image: "https://picsum.photos/380/340?random=101",
  },
];

export default function ExploreScreen() {
  const [query, setQuery] = React.useState("");

  const filteredStrangers = strangerPosts.filter((p) =>
    p.username.toLowerCase().includes(query.toLowerCase())
  );

  const renderTrekPlace = ({ item }) => (
    <View style={styles.trekCard}>
      <Image source={{ uri: item.image }} style={styles.trekImg} />
      <Text style={styles.trekName}>{item.name}</Text>
    </View>
  );
  const renderStrangerPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.usernameBadge}>
        <Text style={styles.usernameText}>@{item.username}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.postImage} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.sectionTitle}>New Treks Near You</Text>
        <FlatList
          data={newTreksNearYou}
          renderItem={renderTrekPlace}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 18 }}
        />
        <Text style={styles.sectionTitle}>Trekkers Around the World</Text>
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search people"
            placeholderTextColor="#777"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>
        <FlatList
          data={filteredStrangers}
          renderItem={renderStrangerPost}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          style={{ paddingHorizontal: 18 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a" },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    paddingHorizontal: 18,
    marginBottom: 20,
    marginTop: 20,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 12,
    marginLeft: 18,
    fontWeight: "700",
    fontSize: 18,
    color: "#fff",
  },
  trekCard: {
    width: 216,
    marginRight: 18,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
  },
  trekImg: { width: "100%", height: 112 },
  trekName: { fontWeight: "bold", fontSize: 15, margin: 10, color: "#fff" },
  postContainer: {
    marginBottom: 22,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
  },
  avatar: { width: 34, height: 34, borderRadius: 17, marginRight: 10 },
  username: {
    fontWeight: "700",
    color: "#fff",
    fontSize: 14,
  },
  usernameBadge: {
    position: "absolute",
    left: 10,
    bottom: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  usernameText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  searchRow: { paddingHorizontal: 18, marginBottom: 12 },
  searchInput: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  postImage: { width: "100%", height: 220 },
});
