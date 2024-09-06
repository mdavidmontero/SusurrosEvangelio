import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getCitacionById } from "../../../actions/citacion.actions";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/UserNavigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Citacion } from "../../../domain/entities/citacion.entities";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Timestamp } from "firebase/firestore"; // Asegúrate de tener esto

export default function DetallesCitacionScreen() {
  const { top } = useSafeAreaInsets();
  const route =
    useRoute<RouteProp<RootStackParams, "DetallesCitacionScreen">>();
  const { id } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [citacion, setCitacion] = useState<Citacion>();

  const getCitacion = async () => {
    const citacionData = await getCitacionById(id);
    setCitacion(citacionData);
  };

  useEffect(() => {
    getCitacion();
  }, []);

  const formatFecha = (fecha: Timestamp | Date | undefined) => {
    if (!fecha) return "Fecha no disponible";

    if (fecha instanceof Timestamp) {
      return new Date(fecha.seconds * 1000).toLocaleDateString();
    }

    return fecha.toLocaleDateString();
  };

  const formatHora = (hora: Timestamp | Date | undefined) => {
    if (!hora) return "Hora no disponible";
    if (hora instanceof Timestamp) {
      return new Date(hora.seconds * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return hora.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View className="flex-1 bg-gray-100" style={{ paddingTop: top }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-0 left-0 z-50 m-4 mt-12"
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text className="w-full p-4 text-xl font-bold text-center text-white rounded-b-lg shadow-md bg-primary">
        Detalles de Citación
      </Text>
      <View className="p-6 mx-4 mt-4 bg-white rounded-lg shadow-md">
        <Text className="mb-2 text-lg font-semibold text-gray-800">
          Título:
        </Text>
        <Text className="mb-4 text-gray-700">{citacion?.titulo}</Text>
        <Text className="mb-2 text-lg font-semibold text-gray-800">
          Descripción:
        </Text>
        <Text className="mb-4 text-gray-700">{citacion?.descripcion}</Text>
        <Text className="mb-2 text-lg font-semibold text-gray-800">Lugar:</Text>
        <Text className="mb-4 text-gray-700">{citacion?.lugar}</Text>
        <Text className="mb-2 text-lg font-semibold text-gray-800">
          Responsable:
        </Text>
        <Text className="text-gray-700">{citacion?.responsable}</Text>
        <Text className="mb-2 text-lg font-semibold text-gray-800">Fecha:</Text>
        <Text className="mb-4 text-gray-700">
          {formatFecha(citacion?.fecha)}
        </Text>
        <Text className="mb-2 text-lg font-semibold text-gray-800">Hora:</Text>
        <Text className="mb-4 text-gray-700">{formatHora(citacion?.hora)}</Text>
      </View>
    </View>
  );
}
