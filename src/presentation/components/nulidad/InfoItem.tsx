import { View, Text } from "react-native";

export const InfoItem = ({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) => (
  <View className={`mb-2 ${isLast ? "mb-0" : ""}`}>
    <Text className="text-sm font-semibold text-gray-700">{label}:</Text>
    <Text className="text-sm text-gray-600">{value}</Text>
  </View>
);
