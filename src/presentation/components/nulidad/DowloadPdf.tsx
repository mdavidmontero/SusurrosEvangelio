import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const DownloadButton = ({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: string;
  onPress: () => void;
}) => (
  <View className="items-center">
    <TouchableOpacity
      className="items-center justify-center w-12 h-12 rounded-full bg-secondary"
      onPress={onPress}
    >
      <Ionicons name={icon as any} size={24} color="#fff" />
    </TouchableOpacity>
    <Text className="mt-1 text-xs text-center text-gray-600">{label}</Text>
  </View>
);
