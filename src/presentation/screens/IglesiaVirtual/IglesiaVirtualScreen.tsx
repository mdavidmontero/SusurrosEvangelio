import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Linking,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { useState } from "react";
import { getLinksOne, updateLink } from "../../../actions/iglesia.actions";
import { useAuthStore } from "../../store/useAuthStore";
import { services } from "../../../utils/index";

export default function IglesiaVirtualScreen() {
  const { top } = useSafeAreaInsets();
  const [meetLink, setMeetLink] = useState<string>("");
  const { user } = useAuthStore();

  const getLinks = async () => {
    const links = await getLinksOne();
    setMeetLink(links[0]);
  };

  useEffect(() => {
    getLinks();
  }, []);

  const handleSave = async () => {
    if (meetLink === "") {
      Alert.alert("Error", "El enlace de la reunión no puede estar vacío.");
      return;
    }
    await updateLink(meetLink);
    Alert.alert(
      "Éxito",
      "El enlace de la reunión se ha guardado correctamente."
    );
  };

  const handleJoinMeeting = async () => {
    const supported = await Linking.canOpenURL(meetLink);
    if (supported) {
      Linking.openURL(meetLink);
    } else {
      Alert.alert("Error", "No se puede abrir el enlace de Meet.");
    }
  };

  return (
    <ScrollView className="pt-4" style={{ paddingTop: top }}>
      <Text className="w-full p-4 text-2xl font-bold text-center text-white bg-primary">
        Iglesia Virtual
      </Text>
      <View className="flex-1 p-4">
        <Text className="mb-3 text-base leading-6">
          Una Iglesia Virtual es un espacio digital donde las personas pueden
          reunirse para orar, compartir su fe y participar en variados temas,
          sin importar su ubicación física. A través de la tecnología, la
          Iglesia Virtual conecta a los fieles de todo el mundo, ofreciéndoles
          un lugar de encuentro con Dios, en comunidad y con acceso a todos los
          recursos espirituales que necesitan.
        </Text>
        <Text className="mb-4 text-lg font-semibold">
          Servicios que prestaría la Iglesia Virtual:
        </Text>
        {services.map((service, index) => (
          <Text key={index} className="mb-2">
            • <Text className="font-bold">{service.title}:</Text>{" "}
            {service.description}
          </Text>
        ))}
        <TextInput
          className="p-3 mb-4 bg-white border border-gray-300 rounded"
          placeholder="Ingrese el enlace de la reunión"
          value={meetLink}
          editable={user?.roles === "ADMIN"}
          onChangeText={setMeetLink}
          keyboardType="url"
        />
        <View className="mb-10">
          {user?.roles === "ADMIN" && (
            <Button
              mode="contained"
              onPress={handleSave}
              className="mb-3 bg-primary"
            >
              Guardar Enlace
            </Button>
          )}
          <Button
            mode="contained"
            onPress={handleJoinMeeting}
            className="bg-primary"
          >
            Unirse a la Reunión
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
