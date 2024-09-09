import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import WebView from "react-native-webview";
import { getEvangelizacionByDate } from "../../../actions/evangelizacion.actions";
import { useEffect, useState } from "react";
import { EvangelizacionData } from "../../../domain/entities/evangelizacion";
import { useIsFocused } from "@react-navigation/native";

export default function ListadoEvangelizaciones() {
  const [evangelizaciones, setEvangelizaciones] = useState<
    EvangelizacionData[]
  >([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getEvangelizaciones(); // Fetch evangelizaciones only when focused
    }
  }, [isFocused]);

  const getEvangelizaciones = async () => {
    const evangelizaciones = await getEvangelizacionByDate(
      new Date().toISOString()
    );
    setEvangelizaciones(evangelizaciones);
  };

  return (
    <View className="mt-10 mx-9">
      {evangelizaciones.map((evangelizacion) => (
        <View
          key={evangelizacion.id}
          className="flex flex-row justify-center bg-[#FFC46C] rounded-lg p-4 mt-5"
        >
          <View className="flex-1 m-2">
            <Text className="mb-1 text-lg font-semibold text-start">
              Palabra del Día
            </Text>
            <Text className="text-xl font-extrabold">
              {evangelizacion.tituloPalabraDelDia}
            </Text>
            <Image
              source={{ uri: evangelizacion.imagenPalabraDelDia }}
              className="w-full h-40 mt-2 rounded-lg"
            />
            <Text className="mt-2 text-base text-justify text-gray-700">
              {evangelizacion.contenidoPalabraDelDia}
            </Text>
          </View>
        </View>
      ))}
      {evangelizaciones.map((evangelizacion) => (
        <View
          key={evangelizacion.id}
          className="flex flex-row justify-center bg-[#FFC46C] rounded-lg p-4 mt-5"
        >
          <View className="flex-1 m-2">
            <Text className="mb-1 text-lg font-semibold text-start">
              Reflexión Diaria
            </Text>
            <Text className="text-xl font-extrabold">
              {evangelizacion.tituloReflexionDiaria}
            </Text>
            <WebView
              source={{ uri: evangelizacion.videoUrlReflexionDiaria }}
              style={{ height: 200, marginTop: 10 }}
            />
            <TouchableOpacity
              className="items-center p-2 rounded-lg "
              onPress={() =>
                Linking.openURL(evangelizacion.videoUrlReflexionDiaria)
              }
            >
              <Text className="font-medium text-center underline text-primary ">
                Ver en YouTube
              </Text>
            </TouchableOpacity>
            <Text className="mt-2 text-base text-justify text-gray-700">
              {evangelizacion.contenidoReflexionDiaria}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
