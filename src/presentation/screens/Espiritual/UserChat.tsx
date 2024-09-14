import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  useWindowDimensions,
  TextInput,
} from "react-native";
import { onSnapshot, doc } from "firebase/firestore";
import { getAdmin, sendMessageToAdmin } from "../../../actions/chat-actions";
import { useAuthStore } from "../../store/useAuthStore";
import { db } from "../../../config";
import { Button } from "react-native-paper";

interface Message {
  message: string;
  timestamp: string;
  uid: string;
}

const UserChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");
  const [adminUid, setAdminUid] = useState<string | null>(null);
  const currentUserUid = useAuthStore((state) => state.user);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchAdminUid = async () => {
      const dataAdminUid = await getAdmin();
      setAdminUid(dataAdminUid);
    };

    fetchAdminUid();
  }, []);

  useEffect(() => {
    if (!currentUserUid || !adminUid) return;

    const chatId = `${currentUserUid.id}_${adminUid}`;
    const chatDocRef = doc(db, "chats", chatId);

    const unsubscribe = onSnapshot(chatDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setMessages(docSnap.data()?.messages || []);
      }
    });

    return () => unsubscribe();
  }, [currentUserUid, adminUid]);

  const handleSend = async () => {
    if (text.trim() !== "" && currentUserUid && adminUid) {
      await sendMessageToAdmin(currentUserUid.id, text);
      setText("");
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={{ width: width * 0.5 }}
      className={`mb-2 p-2 mx-2 rounded-lg ${
        item.uid === currentUserUid?.id ? "bg-primary self-end" : "bg-gray-200"
      }`}
    >
      <Text
        className={`${
          item.uid === currentUserUid?.id ? "text-white" : "text-black"
        }`}
      >
        {item.message}
      </Text>
      <Text className="text-xs text-right text-gray-500">
        {new Date(item.timestamp).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 p-4">
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
      <View className="flex-row items-center mt-4">
        <TextInput
          className="flex-1 p-2 mr-2 border border-gray-300 rounded-lg"
          multiline={true}
          style={{ width: width * 0.5, height: 46 }}
          value={text}
          onChangeText={setText}
          placeholder="Escribe un mensaje..."
        />
        <Button
          mode="contained"
          textColor="#FFFFFF"
          className="rounded bg-primary" // Ensured button color matches app theme
          onPress={handleSend}
        >
          Enviar
        </Button>
      </View>
    </View>
  );
};

export default UserChatScreen;
