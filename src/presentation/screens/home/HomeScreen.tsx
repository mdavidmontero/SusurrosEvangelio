import React, { useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/AdminNavigator";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../store/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props extends StackScreenProps<RootStackParams, "Home"> {}
export const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { isFirstLaunch } = useAuthStore();
  useEffect(() => {
    const checkTutorial = async () => {
      const hasSeenTutorial = await AsyncStorage.getItem("isFirstLaunch");
      console.log(hasSeenTutorial);
      if (hasSeenTutorial === "false") {
        navigation.navigate("SlidesScreen");
      }
    };
    checkTutorial();
  }, []);

  return (
    <View className="items-center justify-center flex-1 gap-4 px-5">
      <TouchableOpacity
        className="w-56 h-20 p-0 overflow-hidden bg-gray-100 border border-gray-300 rounded-full"
        onPress={() => navigation.navigate("EvangelizacionScreen")}
      >
        <ImageBackground
          source={require("../../../../assets/boton-1.jpg")}
          className="items-center justify-center flex-1"
          resizeMode="contain"
        ></ImageBackground>
        <Text className="text-lg italic font-bold text-center">
          Evangelización
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-56 h-20 p-0 overflow-hidden bg-gray-100 border border-gray-300 rounded-full"
        onPress={() => navigation.navigate("IglesiaVirtualScreen")}
      >
        <ImageBackground
          source={require("../../../../assets/boton-2.jpg")}
          className="items-center justify-center flex-1"
          resizeMode="contain"
        ></ImageBackground>
        <Text className="text-lg italic font-bold text-center">
          Iglesia Virtual
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-56 h-20 p-0 overflow-hidden bg-gray-100 border border-gray-300 rounded-full"
        onPress={() => navigation.navigate("GestionNulidadMatrimonial")}
      >
        <ImageBackground
          source={require("../../../../assets/boton-3.jpg")}
          className="items-center justify-center flex-1"
          resizeMode="contain"
        ></ImageBackground>
        <Text className="text-lg italic font-bold text-center">
          Nulidad matrimonial
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-56 h-20 p-0 overflow-hidden bg-gray-100 border border-gray-300 rounded-full"
        onPress={() => navigation.navigate("PastoralEscuchaScreen")}
      >
        <ImageBackground
          source={require("../../../../assets/boton-1.jpg")}
          className="items-center justify-center flex-1"
          resizeMode="contain"
        ></ImageBackground>
        <Text className="text-lg italic font-bold text-center ">
          Temas de citación
        </Text>
      </TouchableOpacity>
    </View>
  );
};
