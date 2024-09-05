import React from "react";
import { View } from "react-native";
import ChatScreen from "./UserChat";
import { useAuthStore } from "../../store/useAuthStore";
import AdminChatListScreen from "./AdminChat";

export const EspiritualScreen = () => {
  const user = useAuthStore((state) => state.user);
  console.log(user);
  return (
    <View className="flex-1">
      {user?.roles === "CLIENTE" ? <ChatScreen /> : <AdminChatListScreen />}
    </View>
  );
};
