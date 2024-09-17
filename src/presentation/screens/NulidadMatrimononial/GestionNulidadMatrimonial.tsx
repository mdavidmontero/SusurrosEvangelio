import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NulidadMatrimonialDataResponse } from "../../../insfrastructure/interfaces/nulidad";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/AdminNavigator";
import { Picker } from "@react-native-picker/picker";
import { getNulidadMatrimonial } from "../../../actions/nulidad.actions";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for the back icon

export default function GestionNulidadMatrimonial() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [solicitudes, setSolicitudes] = useState<
    NulidadMatrimonialDataResponse[]
  >([]);
  const [filteredSolicitudes, setFilteredSolicitudes] = useState<
    NulidadMatrimonialDataResponse[]
  >([]);
  const [selectedEstado, setSelectedEstado] = useState<string>("Todos");

  const loadSolicitudes = useCallback(() => {
    getNulidadMatrimonial((data) => {
      setSolicitudes(data);
      setFilteredSolicitudes(data);
    });
  }, []);

  useEffect(() => {
    loadSolicitudes();
  }, [loadSolicitudes]);

  useFocusEffect(
    useCallback(() => {
      loadSolicitudes();
    }, [loadSolicitudes])
  );

  useEffect(() => {
    filterSolicitudes();
  }, [selectedEstado, solicitudes]);

  const filterSolicitudes = () => {
    if (selectedEstado === "Todos") {
      setFilteredSolicitudes(solicitudes);
    } else {
      setFilteredSolicitudes(
        solicitudes.filter((item) => item.estado === selectedEstado)
      );
    }
  };

  const renderItem = ({ item }: { item: NulidadMatrimonialDataResponse }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("DetalleNulidadMatrimonial", { id: item.id })
      }
      className="p-4 mb-2 bg-white rounded-lg shadow-md"
    >
      <Text className="text-lg font-bold">{`${item.nombre} ${item.apellidos}`}</Text>
      <Text className="text-sm text-gray-600">{item.correoElectronico}</Text>
      <Text className="text-sm text-gray-600">{item.telefonoContacto}</Text>
      <Text className="text-sm font-semibold text-primary">{item.estado}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ paddingTop: top }} className="flex-1 bg-gray-100">
      <View className="flex-row items-center p-4 bg-primary">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-2">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-center text-white">
          Solicitudes de Nulidad Matrimonial
        </Text>
      </View>
      <View className="p-4 bg-white">
        <Text className="mb-2 text-base font-semibold text-gray-700">
          Filtrar
        </Text>
        <Picker
          selectedValue={selectedEstado}
          onValueChange={(itemValue) => setSelectedEstado(itemValue)}
          style={{ height: 50, width: "100%" }}
        >
          <Picker.Item label="Todos" value="Todos" />
          <Picker.Item label="Pendiente" value="Pendiente" />
          <Picker.Item label="En Proceso" value="En Proceso" />
          <Picker.Item label="Aprobado" value="Aprobado" />
          <Picker.Item label="Rechazado" value="Rechazado" />
        </Picker>
      </View>
      <FlatList
        data={filteredSolicitudes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}
