import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../_layout";

const feedData = [
  {
    id: "photo1",
    type: "photo_post",
    user: "alex_dev",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    image: "https://picsum.photos/400/400?10",
    likes: 120,
    liked: false,
    comments: [{ id: "c1", user: "jessica_ui", text: "Beautiful shot!" }],
    showComments: false,
    caption: "Enjoying the summit with friends!",
  },
  {
    id: "photo2",
    type: "photo_post",
    user: "jessica_ui",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    image: "https://picsum.photos/400/400?11",
    likes: 200,
    liked: false,
    comments: [],
    showComments: false,
    caption: "River Valley Trek adventure!",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { logout } = useAuth();

  // Local feed state to allow likes/comments UI interactions
  const [posts, setPosts] = useState(feedData.map((p) => ({ ...p })));

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const liked = !p.liked;
        return { ...p, liked, likes: p.likes + (liked ? 1 : -1) };
      })
    );
  };

  const toggleComments = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, showComments: !p.showComments } : p
      )
    );
  };

  const addComment = (id, text, clearFn) => {
    if (!text || text.trim() === "") return;
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const nextComments = [
          ...p.comments,
          { id: `${p.id}-c${p.comments.length + 1}`, user: "You", text },
        ];
        // Add the comment and then hide the comments area (collapse the comment box)
        return { ...p, comments: nextComments, showComments: false };
      })
    );
    if (typeof clearFn === "function") clearFn();
  };

  const renderPhotoPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{item.user}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          <Ionicons
            name={item.liked ? "heart" : "heart-outline"}
            size={26}
            style={[styles.icon, item.liked && styles.liked]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleComments(item.id)}
          style={{ marginLeft: 14 }}
        >
          <Ionicons name="chatbubble-outline" size={26} style={styles.icon} />
        </TouchableOpacity>
        <Ionicons
          name="paper-plane-outline"
          size={26}
          color="#fff"
          style={{ marginLeft: 14 }}
        />
      </View>
      <Text style={styles.likes}>{item.likes} likes</Text>
      {/* Show comment count when comments are not visible */}
      {!item.showComments && (
        <Text style={styles.commentCount}>{item.comments.length} comments</Text>
      )}
      {/* Comments area */}
      {item.showComments && (
        <View style={styles.commentsArea}>
          <FlatList
            data={item.comments}
            keyExtractor={(c) => c.id}
            renderItem={({ item: c }) => (
              <View style={styles.commentItem}>
                <Text style={styles.commentUser}>{c.user}</Text>
                <Text style={styles.commentText}>{c.text}</Text>
              </View>
            )}
          />
          <CommentInput
            onSubmit={(text, clear) => addComment(item.id, text, clear)}
          />
        </View>
      )}
      <Text style={styles.caption}>
        <Text style={styles.username}>{item.user}</Text> {item.caption}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>HikerNet</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => logout().then(() => router.replace("/(Auth)/login"))}
            style={{ marginRight: 12 }}
          >
            <Text style={{ color: "#ff6b6b", fontWeight: "700" }}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/chat")}
            style={styles.headerIcon}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={26}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/notifications")}
            style={styles.headerIcon}
          >
            <Ionicons name="notifications-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPhotoPost}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

function CommentInput({ onSubmit }) {
  const [text, setText] = useState("");
  return (
    <View style={styles.commentInputRow}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Write a comment..."
        placeholderTextColor="#777"
        style={styles.commentInput}
      />
      <TouchableOpacity
        onPress={() => {
          onSubmit(text, () => setText(""));
        }}
        style={styles.commentSend}
      >
        <Text style={{ color: "#4CAF50", fontWeight: "700" }}>Post</Text>
      </TouchableOpacity>
    </View>
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
  logoText: { fontSize: 22, fontWeight: "700", color: "#fff" },
  headerIcons: { flexDirection: "row" },
  headerIcon: { marginLeft: 20 },
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
    paddingBottom: 10,
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  username: { fontWeight: "700", marginLeft: 10, fontSize: 15, color: "#fff" },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  postImage: { width: "100%", height: 400 },
  iconRow: { flexDirection: "row", paddingHorizontal: 10, paddingVertical: 12 },
  icon: { marginRight: 18, color: "#fff" },
  likes: { marginLeft: 12, fontWeight: "700", fontSize: 14, color: "#fff" },
  caption: { marginHorizontal: 12, marginBottom: 12, color: "#fff" },
});

// Extend stylesheet with comment-related styles
const extraStyles = StyleSheet.create({
  liked: { color: "#ff6b6b" },
  commentCount: { marginLeft: 12, color: "#999", marginBottom: 6 },
  commentsArea: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#090909",
  },
  commentItem: { flexDirection: "row", marginBottom: 6 },
  commentUser: { color: "#4CAF50", fontWeight: "700", marginRight: 8 },
  commentText: { color: "#fff" },
  commentInputRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  commentInput: {
    flex: 1,
    backgroundColor: "#121212",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  commentSend: { marginLeft: 8, paddingHorizontal: 8 },
});

// Merge extra styles into exported styles variable by attaching to module scope
Object.assign(styles, extraStyles);
