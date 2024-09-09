import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { RootStackParams } from "../../navigation/AdminNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ListadoEvangelizaciones from "./ListadoEvangelizaciones";
import { IconButton } from "react-native-paper";
import { useAuthStore } from "../../store/useAuthStore";
import { Image } from "react-native";
import { EvangelizacionData } from "../../../domain/entities/evangelizacion";
import { getEvangelizacionesAll } from "../../../actions/evangelizacion.actions";

export const EvangelizacionScreen = () => {
  const { user } = useAuthStore();
  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();
  const [evangelizaciones, setEvangelizaciones] = useState<
    EvangelizacionData[]
  >([]);
  const [selectedEvangelizacion, setSelectedEvangelizacion] =
    useState<EvangelizacionData | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getEvangelizaciones();
    }
  }, [isFocused]);

  const handleCreateEvangelizacion = () => {
    navigation.navigate("EvangelizacionForm");
  };

  const getEvangelizaciones = async () => {
    const results = await getEvangelizacionesAll();
    setEvangelizaciones(results);

    const today = new Date().toDateString();
    const todayEvangelizacion = results.find(
      (evangelizacion) =>
        new Date(evangelizacion.createdAt).toDateString() === today
    );

    if (todayEvangelizacion) {
      setSelectedEvangelizacion(todayEvangelizacion);
    } else if (results.length > 0) {
      setSelectedEvangelizacion(results[0]);
    }
  };

  const handleSelectEvangelizacion = (evangelizacion: EvangelizacionData) => {
    setSelectedEvangelizacion(evangelizacion);
  };

  const renderItem = ({ item }: { item: EvangelizacionData }) => (
    <TouchableOpacity
      key={item.id}
      className="flex flex-row justify-center bg-[#7F5F41] rounded-full  p-2 mx-1 left-3"
      onPress={() => handleSelectEvangelizacion(item)}
    >
      <Text className="text-lg font-semibold text-white">
        {new Date(item.createdAt).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
        })}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4">
      <Image
        source={require("../../../../assets/Ellipse.png")}
        className="absolute z-0 h-full rounded-b-lg left-2 top-16"
      />
      <View className="flex-row items-center justify-center">
        <Text className="my-2 text-2xl italic font-bold text-center text-primary">
          Evangelización
        </Text>
        <View className="absolute right-0">
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
      </View>
      <View className="flex items-center justify-center">
        <FlatList
          data={evangelizaciones}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          scrollEnabled
        />
      </View>
      <ScrollView className="flex-1 mt-2">
        <ListadoEvangelizaciones
          selectedEvangelizacion={selectedEvangelizacion}
        />
      </ScrollView>
    </View>
  );
};
