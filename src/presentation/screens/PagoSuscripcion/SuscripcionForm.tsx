import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { Donaciones } from "../../../domain/entities/donaciones";
import { Button, TextInput } from "react-native-paper";
import {
  crearDonacion,
  getFirstDonacion,
  updateDonacion,
} from "../../../actions/donaciones.actions";

export default function SuscripcionForm() {
  const [donacion, setDonacion] = useState<Donaciones>({
    id: "",
    linkPago: "",
    valor: 0,
  });

  useEffect(() => {
    getDatosDonacion();
  }, []);

  const getDatosDonacion = async () => {
    try {
      const donar = await getFirstDonacion();
      setDonacion(donar);
    } catch (error) {
      console.error("Error al obtener la donación:", error);
      Alert.alert("Error al obtener la donación");
    }
  };

  const updateDatosDonacion = async () => {
    try {
      if (donacion.id) {
        await updateDonacion(donacion);

        Alert.alert(
          "Donación actualizada",
          "La donación se ha actualizado correctamente"
        );
      } else {
        await crearDonacion(donacion);

        Alert.alert(
          "Donación creada",
          "La donación se ha creado correctamente"
        );
      }
    } catch (error) {
      console.error("Error al actualizar la donación:", error);
      Alert.alert("Error al actualizar la donación");
    }
  };

  return (
    <View className="flex-1 p-6 bg-white rounded-lg shadow-lg">
      <Text className="mb-4 text-3xl italic font-bold text-center text-primary">
        Modificar Donación
      </Text>
      <Text className="mb-2 text-lg font-semibold text-primary">
        Valor de donación
      </Text>
      <View>
        <TextInput
          mode="flat"
          className="w-full h-12 mb-4 bg-white border-2 rounded-lg border-primary"
          keyboardType="number-pad"
          underlineColor="transparent"
          textColor="primary"
          activeUnderlineColor="transparent"
          value={donacion.valor ? donacion.valor.toString() : ""}
          onChangeText={(text) => {
            const value = text ? parseInt(text) : 0;
            setDonacion({ ...donacion, valor: value });
          }}
        />
        <Text className="mb-2 text-lg font-semibold text-primary">
          Link de Pago
        </Text>
        <TextInput
          className="w-full h-12 bg-white border-2 rounded-lg border-primary"
          underlineColor="transparent"
          textColor="primary"
          activeUnderlineColor="transparent"
          placeholder="Ingrese el Link de Pago"
          value={donacion.linkPago}
          multiline={true}
          onChangeText={(text) => setDonacion({ ...donacion, linkPago: text })}
        />
      </View>

      <Button
        disabled={!donacion.linkPago || donacion.valor === 0}
        mode="contained"
        className="mt-4 rounded-lg bg-primary"
        onPress={updateDatosDonacion}
      >
        Guardar
      </Button>
    </View>
  );
}
