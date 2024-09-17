import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import { NulidadMatrimonialDataResponse } from "../../../insfrastructure/interfaces/nulidad";
import {
  getNulidadMatrimonialById,
  actualizarEstadoNulidad,
} from "../../../actions/nulidad.actions";
import { DownloadButton } from "../../components/nulidad/DowloadPdf";
import { InfoItem } from "../../components/nulidad/InfoItem";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

type RouteParams = {
  DetalleNulidadMatrimonial: {
    id: string;
  };
};

export default function NulidadMatrimonialDetailScreen() {
  const { top } = useSafeAreaInsets();
  const [nulidadMatrimonial, setNulidadMatrimonial] =
    useState<NulidadMatrimonialDataResponse | null>(null);
  const route = useRoute<RouteProp<RouteParams, "DetalleNulidadMatrimonial">>();
  const { id } = route.params;
  const [selectedEstado, setSelectedEstado] = useState<string>("");

  useEffect(() => {
    loadNulidadMatrimonial();
  }, [id]);

  const loadNulidadMatrimonial = async () => {
    const data = await getNulidadMatrimonialById(id);
    setNulidadMatrimonial(data);
    setSelectedEstado(data?.estado || "");
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

  const handleEstadoChange = async (estado: string) => {
    setSelectedEstado(estado);
    try {
      await actualizarEstadoNulidad(id, estado);
      Alert.alert("Éxito", "El estado ha sido actualizado correctamente");
      loadNulidadMatrimonial();
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      Alert.alert("Error", "No se pudo actualizar el estado");
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
      <Text className="text-2xl italic font-bold text-center text-primary">
        Detalle de Solicitud de Nulidad Matrimonial
      </Text>
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
          <Picker
            selectedValue={selectedEstado}
            onValueChange={(itemValue) => handleEstadoChange(itemValue)}
            style={{ height: 50, width: "100%" }}
          >
            <Picker.Item label="Pendiente" value="Pendiente" />
            <Picker.Item label="En Proceso" value="En Proceso" />
            <Picker.Item label="Aprobado" value="Aprobado" />
            <Picker.Item label="Rechazado" value="Rechazado" />
          </Picker>
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
