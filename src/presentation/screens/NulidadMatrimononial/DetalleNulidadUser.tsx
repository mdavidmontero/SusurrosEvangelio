import { View, Text, Linking, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NulidadMatrimonialDataResponse } from "../../../insfrastructure/interfaces/nulidad";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { InfoItem } from "../../components/nulidad/InfoItem";
import { Picker } from "@react-native-picker/picker";
import { DownloadButton } from "../../components/nulidad/DowloadPdf";
import { getNulidadMatrimonialByUserId } from "../../../actions/nulidad.actions";
import { useAuthStore } from "../../store/useAuthStore";
export default function DetalleNulidadUser() {
  const { top } = useSafeAreaInsets();
  const [nulidadMatrimonial, setNulidadMatrimonial] =
    useState<NulidadMatrimonialDataResponse | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    loadNulidadMatrimonial();
  }, []);

  const loadNulidadMatrimonial = async () => {
    const data = await getNulidadMatrimonialByUserId(user?.id || "");
    if (Array.isArray(data) && data.length > 0) {
      setNulidadMatrimonial(data[0]); // Assuming we want the first item
    } else {
      setNulidadMatrimonial(null); // Handle case where no data is returned
    }
  };

  const handleDownload = async (url: string | File | null) => {
    let fileUrl: string | null = null;

    if (url instanceof File) {
      fileUrl = URL.createObjectURL(url);
    } else {
      fileUrl = url;
    }

    if (fileUrl) {
      try {
        await Linking.openURL(fileUrl);
      } catch (error) {
        console.error("Error al abrir el enlace:", error);
      }
    } else {
      Alert.alert("Error", "No hay URL disponible para descargar");
    }
  };

  if (!nulidadMatrimonial) {
    return (
      <View className="items-center justify-center flex-1">
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100" style={{ paddingTop: top }}>
      <View className="justify-center p-4 bg-primary">
        <Text className="text-2xl font-bold text-center text-white">
          Detalle de Solicitud de Nulidad Matrimonial
        </Text>
      </View>
      <View className="p-4 m-4 bg-white rounded-lg shadow-md">
        <Text className="mb-2 text-xl font-bold text-gray-800">{`${nulidadMatrimonial.nombre} ${nulidadMatrimonial.apellidos}`}</Text>
        <InfoItem
          label="Correo Electrónico"
          value={nulidadMatrimonial.correoElectronico}
        />
        <InfoItem
          label="Teléfono de Contacto"
          value={nulidadMatrimonial.telefonoContacto}
        />
        <InfoItem
          label="Lugar de Matrimonio"
          value={nulidadMatrimonial.lugarMatrimonio}
        />
        <InfoItem
          label="Sacerdote Celebrante"
          value={nulidadMatrimonial.nombreSacerdoteCelebrante}
        />
        <InfoItem
          label="Duración de Convivencia"
          value={nulidadMatrimonial.duracionConvivencia}
        />
        <InfoItem
          label="Motivo Principal"
          value={nulidadMatrimonial.motivoPrincipal}
        />
        <InfoItem
          label="Descripción del Motivo"
          value={nulidadMatrimonial.descripcionMotivo}
        />
        <View className="mt-4">
          <Text className="mb-2 text-base font-semibold text-gray-700">
            Estado:
          </Text>
          <Text>{nulidadMatrimonial.estado}</Text>
        </View>
      </View>
      <View className="flex-row justify-around p-4 m-4 rounded-lg shadow-md bg-gray-50">
        <DownloadButton
          label="Cert. Matrimonio"
          icon="document-text-outline"
          onPress={() =>
            handleDownload(nulidadMatrimonial.certificadoMatrimonioURL)
          }
        />
        <DownloadButton
          label="Cert. Bautismo"
          icon="water-outline"
          onPress={() =>
            handleDownload(nulidadMatrimonial.certificadoBautismoURL)
          }
        />
        <DownloadButton
          label="Pruebas Adicionales"
          icon="attach-outline"
          onPress={() =>
            handleDownload(nulidadMatrimonial.pruebasAdicionalesURL)
          }
        />
      </View>
    </ScrollView>
  );
}
