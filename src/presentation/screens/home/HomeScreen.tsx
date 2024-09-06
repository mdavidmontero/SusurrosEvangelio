import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/AdminNavigator";

interface Props extends StackScreenProps<RootStackParams, "Home"> {}
export const HomeScreen = ({ navigation }: Props) => {
  return (
    // Todo: Agregar imagenes de diseño y cambiar color de letra
    // Todo: Crear un componente reutilizable para el boton
    <View className="items-center justify-center flex-1 px-5 gap-7">
      <TouchableOpacity
        className="w-64 h-24 p-0 overflow-hidden border rounded-3xl border-1"
        onPress={() => navigation.navigate("EvangelizacionScreen")}
      >
        <ImageBackground
          source={require("../../../../assets/slide-1.png")}
          className="items-center justify-center flex-1"
          resizeMode="cover"
        >
          <Text className="text-lg font-bold text-black">Evangelización</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity className="w-64 h-24 p-0 overflow-hidden border rounded-3xl border-1">
        <ImageBackground
          source={require("../../../../assets/slide-2.png")}
          className="items-center justify-center flex-1"
          resizeMode="cover"
        >
          <Text className="text-lg font-bold text-black">Iglesia Virtual</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-64 h-24 p-0 overflow-hidden border rounded-3xl border-1"
        onPress={() => navigation.navigate("GestionNulidadMatrimonial")}
      >
        <ImageBackground
          source={require("../../../../assets/slide-3.png")}
          className="items-center justify-center flex-1"
          resizeMode="cover"
        >
          <Text className="text-lg font-bold text-black">
            Nulidad matrimonial
          </Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-64 h-24 p-0 overflow-hidden border rounded-3xl border-1"
        onPress={() => navigation.navigate("PastoralEscuchaScreen")}
      >
        <ImageBackground
          source={require("../../../../assets/slide-1.png")}
          className="items-center justify-center flex-1"
          resizeMode="cover"
        >
          <Text className="text-lg font-bold text-black">
            Temas de citación
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};
