import { View, Text, Linking } from "react-native";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/AdminNavigator";
import { useAuthStore } from "../../store/useAuthStore";
import { subscribeToDonaciones } from "../../../actions/donaciones.actions"; // Updated to use real-time subscription
import { Donaciones } from "../../../domain/entities/donaciones";

export default function SuscripcionScreen() {
  const { user } = useAuthStore();
  const [donacion, setDonacion] = useState<Donaciones>();

  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, "SuscripcionForm">>();

  const handlePayment = async () => {
    const supported = await Linking.canOpenURL(donacion?.linkPago!);
    if (supported) {
      await Linking.openURL(donacion?.linkPago!);
    } else {
      console.log("No se puede abrir la URI: " + donacion?.linkPago);
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeToDonaciones((donaciones) => {
      if (donaciones.length > 0) {
        setDonacion(donaciones[0]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleBack = () => {
      alert("Pago realizado correctamente");
    };

    const subscription = Linking.addEventListener("url", handleBack);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View className="items-center justify-center flex-1 p-5 bg-gray-50">
      <Text className="mb-4 text-4xl italic font-extrabold text-center text-primary">
        Donaciones
      </Text>
      <Text className="mb-4 text-lg italic text-center ">
        Ayúdanos a seguir adelante con nuestras actividades, con tu donación
        apoyamos a la iglesia.
      </Text>
      <Text className="mb-6 text-base italic text-center text-gray-800">
        Al presionar el botón de pago, serás redirigido a la página de pago.
      </Text>
      <Text className="mb-2 text-xl italic font-semibold text-primary">
        Valor
      </Text>
      <Text className="mb-2 text-lg italic">
        Donaciones a partir de {donacion?.valor} COP
      </Text>

      <Button
        mode="contained"
        textColor="#FFFFFF"
        className="w-full text-white rounded-lg shadow-md bg-primary"
        onPress={handlePayment}
      >
        Pagar
      </Button>
      {user?.roles === "ADMIN" && (
        <>
          <Button
            mode="contained"
            textColor="#FFFFFF"
            className="w-full mt-4 text-white rounded-lg shadow-md bg-primary"
            onPress={() => navigation.navigate("SuscripcionForm")}
          >
            Modificar Donación
          </Button>
          <Text className="mt-6 text-lg italic text-center">
            O presiona el botón para modificar los datos de la donación.
          </Text>
        </>
      )}
    </View>
  );
}
