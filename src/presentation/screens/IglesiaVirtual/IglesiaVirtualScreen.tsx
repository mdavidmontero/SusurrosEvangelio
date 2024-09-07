import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { useState } from "react";
import { getLinksOne, updateLink } from "../../../actions/iglesia.actions";
import { useAuthStore } from "../../store/useAuthStore";
import { formatFecha, formatHora, services } from "../../../utils/index";
import DateTimePicker from "@react-native-community/datetimepicker";
import { IglesiaVirtual } from "../../../domain/entities/virtual";
import { iglesiaVirtualInitialValues } from "../../../types/index";
import { Timestamp } from "firebase/firestore";

export default function IglesiaVirtualScreen() {
  const { top } = useSafeAreaInsets();
  const [virtual, setVirtual] = useState<IglesiaVirtual>(
    iglesiaVirtualInitialValues
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const { user } = useAuthStore();

  const getLinks = async () => {
    const links = await getLinksOne();
    setVirtual(links[0]);
  };

  useEffect(() => {
    getLinks();
  }, []);

  // Convertir Timestamp a Date si es necesario
  const fechaDate =
    virtual.fecha instanceof Timestamp
      ? virtual.fecha.toDate()
      : virtual.fecha || new Date();
  const horaDate =
    virtual.hora instanceof Timestamp
      ? virtual.hora.toDate()
      : virtual.hora || new Date();

  const handleSave = async () => {
    if (!virtual.meetLink || !virtual.hora || !virtual.fecha) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }
    await updateLink(virtual);
    Alert.alert(
      "Éxito",
      "El enlace de la reunión se ha guardado correctamente."
    );
  };

  const handleJoinMeeting = async () => {
    const supported = await Linking.canOpenURL(virtual.meetLink);
    if (supported) {
      Linking.openURL(virtual.meetLink);
    } else {
      Alert.alert("Error", "No se puede abrir el enlace de Meet.");
    }
  };

  return (
    <ScrollView className="pt-4" style={{ paddingTop: top }}>
      <Text className="w-full p-4 text-xl italic font-bold text-center text-white bg-primary">
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
        <Text className="mb-4 text-lg font-semibold text-primary">
          Servicios que prestaría la Iglesia Virtual:
        </Text>
        {services.map((service, index) => (
          <Text key={index} className="mb-2">
            • <Text className="font-bold">{service.title}:</Text>{" "}
            {service.description}
          </Text>
        ))}

        <Text className="mb-3 text-lg font-bold text-center text-primary">
          Detalles de la reunión:
        </Text>

        <Text className="mb-3 text-base font-bold text-primary">
          Fecha de la reunión:
        </Text>
        {user?.roles === "CLIENTE" && (
          <Text className="mb-3 text-base text-gray-700">
            {fechaDate ? fechaDate.toLocaleDateString() : "Fecha no disponible"}
          </Text>
        )}
        {user?.roles === "ADMIN" && (
          <TouchableOpacity
            className="px-6 py-3 mb-4 bg-white border border-gray-300 rounded-lg shadow-md"
            onPress={() => setShowDatePicker(true)}
          >
            <Text className="font-bold text-center text-black">
              {fechaDate
                ? fechaDate.toLocaleDateString()
                : "Seleccione una fecha"}
            </Text>
          </TouchableOpacity>
        )}

        <Text className="mb-3 text-base font-bold text-primary">
          Hora de la reunión:
        </Text>
        {user?.roles === "CLIENTE" && (
          <Text className="mb-3 text-base text-gray-700">
            {horaDate ? horaDate.toLocaleTimeString() : "Hora no disponible"}
          </Text>
        )}
        {user?.roles === "ADMIN" && (
          <TouchableOpacity
            className="px-6 py-3 mb-4 bg-white border border-gray-300 rounded-lg shadow-md"
            onPress={() => setShowTimePicker(true)}
          >
            <Text className="font-bold text-center text-black">
              {horaDate ? horaDate.toLocaleTimeString() : "Seleccione una hora"}
            </Text>
          </TouchableOpacity>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={fechaDate} // Aseguramos que sea un objeto Date
            mode="date"
            display="default"
            onChange={(event, selectedFecha) => {
              setShowDatePicker(false);
              if (selectedFecha)
                setVirtual({ ...virtual, fecha: selectedFecha });
            }}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={horaDate} // Aseguramos que sea un objeto Date
            mode="time"
            display="default"
            onChange={(event, selectedHora) => {
              setShowTimePicker(false);
              if (selectedHora) setVirtual({ ...virtual, hora: selectedHora });
            }}
          />
        )}

        <TextInput
          className="p-3 mb-4 bg-white border border-gray-300 rounded"
          placeholder="Ingrese el enlace de la reunión"
          value={virtual.meetLink}
          editable={user?.roles === "ADMIN"}
          onChangeText={(text) => setVirtual({ ...virtual, meetLink: text })}
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
            textColor="white"
            mode="contained"
            onPress={handleJoinMeeting}
            className=" bg-primary"
          >
            Unirse a la Reunión
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
