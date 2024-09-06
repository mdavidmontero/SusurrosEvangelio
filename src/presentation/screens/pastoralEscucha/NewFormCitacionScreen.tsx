import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/AdminNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CitacionInitialValues } from "../../../types";
import {
  crearCitacion,
  getCitacionById,
  updateCitacion,
} from "../../../actions/citacion.actions";
import { Timestamp } from "firebase/firestore";

export default function NewFormCitacionScreen() {
  const { top } = useSafeAreaInsets();
  const [citacion, setCitacion] = useState(CitacionInitialValues);
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const route = useRoute<RouteProp<RootStackParams, "NewFormCitacionScreen">>();
  const { id } = route.params;

  const getCitacion = async () => {
    if (id) {
      const citacionData = await getCitacionById(id);
      setCitacion({
        ...citacionData,
        fecha:
          citacionData.fecha instanceof Timestamp
            ? citacionData.fecha.toDate()
            : new Date(),
        hora:
          citacionData.hora instanceof Timestamp
            ? citacionData.hora.toDate()
            : new Date(),
      });
    }
  };

  useEffect(() => {
    getCitacion();
  }, []);

  const handleSubmit = async () => {
    if (
      !citacion.titulo ||
      !citacion.descripcion ||
      !citacion.lugar ||
      !citacion.responsable
    ) {
      Alert.alert(
        "Error",
        "Por favor, complete todos los campos obligatorios."
      );
      return;
    }

    if (id) {
      await updateCitacion(citacion.id, citacion);
    } else {
      await crearCitacion(citacion);
    }

    Alert.alert("Éxito", "El tema de citación ha sido guardado.");
    navigation.goBack(); // Navigate back after saving
  };

  return (
    <ScrollView className="flex-1 bg-gray-100" style={{ paddingTop: top }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-0 left-0 z-50 m-4"
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text className="w-full p-3 mb-4 text-lg font-bold text-center text-white bg-primary">
        Nuevo Tema de Citación
      </Text>
      <View className="p-6">
        <View className="p-6 mb-6 bg-white rounded-lg shadow-md">
          <Text className="mb-2 text-lg font-semibold text-gray-700">
            Título del Tema
          </Text>
          <TextInput
            className="p-3 mb-4 border border-gray-300 rounded-md"
            placeholder="Ej: Reunión de Catequesis"
            value={citacion.titulo}
            onChangeText={(text) => setCitacion({ ...citacion, titulo: text })}
          />

          <Text className="mb-2 text-lg font-semibold text-gray-700">
            Descripción
          </Text>
          <TextInput
            className="p-3 mb-4 border border-gray-300 rounded-md"
            placeholder="Breve descripción del tema..."
            multiline
            numberOfLines={4}
            value={citacion.descripcion}
            onChangeText={(text) =>
              setCitacion({ ...citacion, descripcion: text })
            }
          />

          <Text className="mb-2 text-lg font-semibold text-gray-700">
            Fecha de la Citación
          </Text>
          <TouchableOpacity
            className="px-4 py-3 mb-4 rounded-md bg-primary"
            onPress={() => setShowDatePicker(true)}
          >
            <Text className="font-semibold text-center text-white">
              {citacion.fecha.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={citacion.fecha}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate)
                  setCitacion({ ...citacion, fecha: selectedDate });
              }}
            />
          )}

          <Text className="mb-2 text-lg font-semibold text-gray-700">
            Hora de la Citación
          </Text>
          <TouchableOpacity
            className="px-4 py-3 mb-4 rounded-md bg-primary"
            onPress={() => setShowTimePicker(true)}
          >
            <Text className="font-semibold text-center text-white">
              {citacion.hora.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={citacion.hora}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) {
                  const updatedTime = new Date(citacion.fecha);
                  updatedTime.setHours(selectedTime.getHours());
                  updatedTime.setMinutes(selectedTime.getMinutes());
                  setCitacion({ ...citacion, hora: updatedTime });
                }
              }}
            />
          )}

          <Text className="mb-2 text-lg font-semibold text-gray-700">
            Lugar
          </Text>
          <TextInput
            className="p-3 mb-4 border border-gray-300 rounded-md"
            placeholder="Ej: Salón Parroquial"
            value={citacion.lugar}
            onChangeText={(text) => setCitacion({ ...citacion, lugar: text })}
          />

          <Text className="mb-2 text-lg font-semibold text-gray-700">
            Responsable
          </Text>
          <TextInput
            className="p-3 mb-4 border border-gray-300 rounded-md"
            placeholder="Ej: Padre Juan"
            value={citacion.responsable}
            onChangeText={(text) =>
              setCitacion({ ...citacion, responsable: text })
            }
          />

          <TouchableOpacity
            className="px-4 py-3 rounded-md bg-primary"
            onPress={handleSubmit}
          >
            <Text className="font-semibold text-center text-white">
              Guardar Tema de Citación
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
