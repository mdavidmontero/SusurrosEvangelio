import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";

export const HomeScreen = () => {
  return (
    // Todo: Agregar imagenes de diseño y cambiar color de letra
    // Todo: Crear un componente reutilizable para el boton
    <View className="flex-1 justify-center items-center px-5 gap-7">
      <TouchableOpacity className="w-64 h-24 rounded-3xl overflow-hidden p-0 border border-1">
        <ImageBackground
          source={require("../../../../assets/slide-1.png")}
          className="flex-1 justify-center items-center"
          resizeMode="cover"
        >
          <Text className="text-black font-bold text-lg">Evangelización</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity className="w-64 h-24 rounded-3xl overflow-hidden p-0 border border-1">
        <ImageBackground
          source={require("../../../../assets/slide-2.png")}
          className="flex-1 justify-center items-center"
          resizeMode="cover"
        >
          <Text className="text-black font-bold text-lg">Iglesia Virtual</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity className="w-64 h-24 rounded-3xl overflow-hidden p-0 border border-1">
        <ImageBackground
          source={require("../../../../assets/slide-3.png")}
          className="flex-1 justify-center items-center"
          resizeMode="cover"
        >
          <Text className="text-black font-bold text-lg">
            Nulidad matrimonial
          </Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity className="w-64 h-24 rounded-3xl overflow-hidden p-0 border border-1">
        <ImageBackground
          source={require("../../../../assets/slide-1.png")}
          className="flex-1 justify-center items-center"
          resizeMode="cover"
        >
          <Text className="text-black font-bold text-lg">
            Temas de citación
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};
