import React from "react";
import { View, Image } from "react-native";

export const SplashScreenInicial = () => {
  return (
    <View className="items-center justify-center flex-1 bg-primary">
      <Image
        className="object-cover w-full"
        source={require("../../../../assets/Plash.png")}
      />
    </View>
  );
};
