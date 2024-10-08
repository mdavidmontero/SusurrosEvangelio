import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

export const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
      <Text>Cargando...</Text>
    </View>
  );
};
