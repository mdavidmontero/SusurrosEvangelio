import React from "react";
import { Text, useWindowDimensions, View, Button } from "react-native";
import { RootStackParams } from "../../navigation/AdminNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import ListadoEvangelizaciones from "./ListadoEvangelizaciones";
import { Image } from "react-native";

export const EvangelizacionScreen = () => {
  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();
  const { width } = useWindowDimensions();

  const handleCreateEvangelizacion = () => {
    navigation.navigate("EvangelizacionForm"); // Adjust the route name as necessary
  };

  return (
    <View className="flex-1 p-4">
      <Image
        source={require("../../../../assets/Ellipse.png")}
        className="absolute z-0 h-full rounded-b-lg left-2 top-2"
      />
      <ScrollView className="z-10 flex-1 ">
        <Text className="text-2xl italic font-bold text-center">
          Evangelización
        </Text>
        <Button
          title="Nueva Evangelización"
          onPress={handleCreateEvangelizacion}
          color="#6200EE"
        />
        <ListadoEvangelizaciones />
      </ScrollView>
    </View>
  );
};
