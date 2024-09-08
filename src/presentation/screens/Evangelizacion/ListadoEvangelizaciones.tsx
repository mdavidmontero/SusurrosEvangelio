import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import WebView from "react-native-webview";

export default function ListadoEvangelizaciones() {
  const staticData = {
    palabraDelDia: {
      titulo: "Título Estático de la Palabra del Día",
      imagen: "https://s.bibliaon.com/es/img/ogimage_palav.png",
      contenido: "Contenido estático de la Palabra del Día.",
    },
    reflexionDiaria: {
      titulo: "Título Estático de la Reflexión Diaria",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  };

  return (
    <View className="mt-10 mx-9">
      <View className="flex flex-row justify-center bg-[#FFC46C] rounded-lg p-2">
        <View className="flex-1 m-2 ">
          <Text className="mb-2 text-start">Palabra del dia</Text>
          <Text className="text-base font-bold">
            {staticData.palabraDelDia.titulo}
          </Text>
          <Image
            source={{ uri: staticData.palabraDelDia.imagen }}
            className="w-20 h-20 mt-2 rounded-lg"
          />
          <Text className="text-justify">
            {staticData.palabraDelDia.contenido}
          </Text>
        </View>
      </View>
      {/* New Reflection Box */}
      <View className="flex flex-row justify-center bg-[#FFC46C] rounded-lg p-2 mt-5">
        <View className="flex-1 m-2 ">
          <Text className="mb-2 text-start">Reflexión Diaria</Text>
          <Text className="text-base font-bold">
            {staticData.reflexionDiaria.titulo}
          </Text>
          <WebView
            source={{ uri: staticData.reflexionDiaria.videoUrl }}
            style={{ height: 200, marginTop: 10 }}
          />
          <TouchableOpacity
            onPress={() => Linking.openURL(staticData.reflexionDiaria.videoUrl)}
            style={{ marginTop: 10, alignItems: "center" }}
          >
            <Text className="text-blue-500">Ver en YouTube</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
