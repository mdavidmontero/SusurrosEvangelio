import {
  View,
  Text,
  Linking,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NulidadMatrimonialDataResponse } from "../../../insfrastructure/interfaces/nulidad";
import { useEffect, useState } from "react";
import { InfoItem } from "../../components/nulidad/InfoItem";
import { DownloadButton } from "../../components/nulidad/DowloadPdf";
import { getNulidadMatrimonialByUserId } from "../../../actions/nulidad.actions";
import { useAuthStore } from "../../store/useAuthStore";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/UserNavigation";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
export default function DetalleNulidadUser() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [nulidadMatrimonial, setNulidadMatrimonial] =
    useState<NulidadMatrimonialDataResponse | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    loadNulidadMatrimonial();
  }, []);

  const loadNulidadMatrimonial = async () => {
    const data = await getNulidadMatrimonialByUserId(user?.id || "");
    if (Array.isArray(data) && data.length > 0) {
      setNulidadMatrimonial(data[0]);
    } else {
      setNulidadMatrimonial(null);
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

  return (
    <ScrollView className="flex-1 bg-gray-100" style={{ paddingTop: top }}>
      <Text className="text-2xl italic font-bold text-center text-primary">
        Detalle de Solicitud de Nulidad Matrimonial
      </Text>

      <View className="p-4 m-4 bg-white rounded-lg shadow-md">
        {nulidadMatrimonial ? (
          <>
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
          </>
        ) : (
          <Text className="">
            No has enviado la solicitud de nulidad matrimonial
          </Text>
        )}
      </View>
      {nulidadMatrimonial && (
        <View className="flex-row justify-around p-4 m-4 rounded-lg shadow-md bg-gray-50">
          <DownloadButton
            label="Cert. Matrimonio"
            icon="document-text-outline"
            onPress={() =>
              handleDownload(nulidadMatrimonial!.certificadoMatrimonioURL)
            }
          />
          <DownloadButton
            label="Cert. Bautismo"
            icon="water-outline"
            onPress={() =>
              handleDownload(nulidadMatrimonial!.certificadoBautismoURL)
            }
          />
          <DownloadButton
            label="Pruebas Adicionales"
            icon="attach-outline"
            onPress={() =>
              handleDownload(nulidadMatrimonial!.pruebasAdicionalesURL)
            }
          />
        </View>
      )}
    </ScrollView>
  );
}
