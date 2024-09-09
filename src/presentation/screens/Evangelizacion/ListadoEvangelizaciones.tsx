import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import WebView from "react-native-webview";
import { EvangelizacionData } from "../../../domain/entities/evangelizacion";

interface ListadoEvangelizacionesProps {
  selectedEvangelizacion: EvangelizacionData | null;
}

export default function ListadoEvangelizaciones({
  selectedEvangelizacion,
}: ListadoEvangelizacionesProps) {
  return (
    <View className="mx-5">
      {selectedEvangelizacion && (
        <View className="flex flex-row justify-center bg-[#FFC46C] rounded-lg p-4 mt-5">
          <View className="flex-1 m-2">
            <Text className="mb-1 text-lg font-semibold text-start">
              Palabra del Día
            </Text>
            <Text className="text-xl font-extrabold">
              {selectedEvangelizacion.tituloPalabraDelDia}
            </Text>
            <Image
              source={{ uri: selectedEvangelizacion.imagenPalabraDelDia }}
              className="w-full h-40 mt-2 rounded-lg"
            />
            <Text className="mt-2 text-base text-justify text-gray-700">
              {selectedEvangelizacion.contenidoPalabraDelDia}
            </Text>
            <Text className="mt-4 mb-1 text-lg font-semibold text-start">
              Reflexión Diaria
            </Text>
            <Text className="text-xl font-extrabold">
              {selectedEvangelizacion.tituloReflexionDiaria}
            </Text>
            <WebView
              source={{ uri: selectedEvangelizacion.videoUrlReflexionDiaria }}
              style={{ height: 200, marginTop: 10 }}
            />
            <TouchableOpacity
              className="items-center p-2 rounded-lg "
              onPress={() =>
                Linking.openURL(selectedEvangelizacion.videoUrlReflexionDiaria)
              }
            >
              <Text className="font-medium text-center underline text-primary ">
                Ver en YouTube
              </Text>
            </TouchableOpacity>
            <Text className="mt-2 text-base text-justify text-gray-700">
              {selectedEvangelizacion.contenidoReflexionDiaria}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
