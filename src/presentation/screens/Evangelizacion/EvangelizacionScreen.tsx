import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { RootStackParams } from "../../navigation/AdminNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import ListadoEvangelizaciones from "./ListadoEvangelizaciones";
import { Button } from "react-native-paper";
import { Image } from "react-native";
import { IconButton } from "react-native-paper"; // Import IconButton
import { useAuthStore } from "../../store/useAuthStore";

export const EvangelizacionScreen = () => {
  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();

  const { user } = useAuthStore();
  const handleCreateEvangelizacion = () => {
    navigation.navigate("EvangelizacionForm"); // Adjust the route name as necessary
  };

  return (
    <View className="flex-1 p-4 ">
      <Image
        source={require("../../../../assets/Ellipse.png")}
        className="absolute z-0 h-full rounded-b-lg left-2 top-2"
      />
      <ScrollView className="flex-1 ">
        <View className="flex-row items-center justify-center">
          <Text className="flex-1 text-2xl italic font-bold text-center text-primary ">
            Evangelización
          </Text>
          {user?.roles === "ADMIN" && (
            <IconButton
              icon="plus"
              size={20}
              onPress={handleCreateEvangelizacion}
              className="rounded-full bg-primary"
              iconColor="white"
            />
          )}
        </View>
        <ListadoEvangelizaciones />
      </ScrollView>
    </View>
  );
};
