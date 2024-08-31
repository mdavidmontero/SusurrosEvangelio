import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { subscribeToChatsForAdmin } from "../../../actions/chat-actions";
import { useAuthStore } from "../../store/useAuthStore";
import { RootStackParams } from "../../navigation/UserNavigation";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { obtenerUsuarioPorId } from "../../../actions/user.action";
import { useChatStore } from "../../store/chat-store";

const AdminChatListScreen: React.FC = () => {
  const [chats, setChats] = useState<any[]>([]);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const adminUid = useAuthStore((state) => state.user);
  const setFriend = useChatStore((state) => state.setFriend);
  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();

  useEffect(() => {
    if (adminUid) {
      const unsubscribe = subscribeToChatsForAdmin(
        adminUid.id,
        async (chatsData) => {
          setChats(chatsData);
          await fetchUserNames(chatsData);
        }
      );

      return () => unsubscribe();
    }
  }, [adminUid]);

  const fetchUserNames = async (chats: any[]) => {
    const names: { [key: string]: string } = {};

    for (const chat of chats) {
      const otherUserId = chat.users.find(
        (uid: string) => uid !== adminUid!.id
      );
      if (otherUserId && !names[otherUserId]) {
        const user = await obtenerUsuarioPorId(otherUserId);
        setFriend(user!);
        names[otherUserId] = user?.nombres || "Usuario Desconocido";
      }
    }

    setUserNames(names);
  };

  const handleChatPress = (chatId: string) => {
    navigation.navigate("AdminChatScreen", { chatId });
  };

  const renderItem = ({ item }: { item: any }) => {
    const otherUserId = item.users?.find((uid: string) => uid !== adminUid?.id);
    const otherUserName = userNames[otherUserId] || "Usuario Desconocido";

    return (
      <TouchableOpacity
        onPress={() => handleChatPress(item.chatId)}
        className="py-2 border-b border-gray-300 flex-row justify-between items-center"
      >
        <Text className="text-lg font-bold">{otherUserName}</Text>
        {/* Mostrar indicador si hay mensajes nuevos */}
        {item.hasNewMessages && (
          <Text className="text-red-500">Nuevo mensaje</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.chatId}
      />
    </View>
  );
};

export default AdminChatListScreen;
