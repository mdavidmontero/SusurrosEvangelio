import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  useWindowDimensions,
} from "react-native";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config";
import { sendMessageFromAdmin } from "../../../actions/chat-actions";
import { useAuthStore } from "../../store/useAuthStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "react-native-paper";

interface Message {
  message: string;
  timestamp: string;
  uid: string;
}

const AdminChatScreen: React.FC<{ route: any }> = ({ route }) => {
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { chatId } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");
  const adminUid = useAuthStore((state) => state.user);
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    const chatDocRef = doc(db, "chats", chatId);

    const unsubscribe = onSnapshot(chatDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const chatData = docSnap.data();
        setMessages(chatData.messages || []);
        // Marcar mensajes como leídos
        if (chatData.hasNewMessages) {
          updateDoc(chatDocRef, { hasNewMessages: false });
        }
        // Scroll to the end when a new message is received
        flatListRef.current?.scrollToEnd({ animated: true });
      }
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSend = async () => {
    if (text.trim() !== "") {
      await sendMessageFromAdmin(chatId, adminUid?.id!, text);
      setText("");
      // Scroll to the end after sending a message
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={{ width: width * 0.5 }}
      className={`mb-2 p-2 rounded-xl ${
        item.uid === adminUid?.id
          ? "bg-primary self-end" // Updated color to match app theme
          : "bg-gray-200 self-start" // Updated color to match app theme
      }`}
    >
      <Text
        className={
          item.uid === adminUid?.id
            ? "text-white text-base"
            : "text-black text-base"
        }
      >
        {item.message}
      </Text>
      <Text className="text-xs text-right text-gray-500">
        {" "}
        {/* Updated text color */}
        {new Date(item.timestamp).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View className={`flex-1 p-4`} style={{ paddingTop: top }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />
      <View className="flex-row items-center mt-4">
        <TextInput
          className="flex-1 p-2 mr-2 border border-gray-300 rounded-lg"
          value={text}
          onChangeText={setText}
          placeholder="Escribe un mensaje..."
          multiline={true}
        />
        <Button
          mode="contained"
          className="rounded-md bg-primary" // Ensured button color matches app theme
          onPress={handleSend}
        >
          Enviar
        </Button>
      </View>
    </View>
  );
};

export default AdminChatScreen;
