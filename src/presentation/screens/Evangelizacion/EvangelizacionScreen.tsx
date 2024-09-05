import React from "react";
import { Text, View } from "react-native";
import { RootStackParams } from "../../navigation/AdminNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { Button } from "react-native-paper";

export const EvangelizacionScreen = () => {
  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();
  return (
    <ScrollView className="flex-1 p-4">
      <View className="flex items-end justify-end mb-2">
        <Button
          mode="contained"
          className="h-10 w-28 bg-secondary"
          onPress={() => {}}
        >
          Nueva
        </Button>
      </View>
      <View className="flex items-center justify-center ">
        <Text className="text-lg font-bold">Lista de Evangelizaciones</Text>
      </View>
    </ScrollView>
  );
};
