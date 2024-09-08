import { View, Text, Linking, Button } from "react-native";
import { useEffect } from "react";
import { TextInput } from "react-native-paper";

export default function SuscripcionScreen() {
  const paymentUrl = "https://mpago.li/1xw8ZN5"; // Replace with your actual payment link

  const handlePayment = async () => {
    const supported = await Linking.canOpenURL(paymentUrl);
    if (supported) {
      await Linking.openURL(paymentUrl);
    } else {
      console.log("Don't know how to open URI: " + paymentUrl);
    }
  };

  useEffect(() => {
    const handleBack = () => {
      // TODO: Verificar pago
      // TODO: Si pago es exitoso, mostrar mensaje de confirmacion y actualizar estado de la suscripcion
      // TODO: Si pago es fallido, mostrar mensaje de error

      alert("Pago realizado correctamente");
    };

    // Add event listener for app coming back from the payment page
    const subscription = Linking.addEventListener("url", handleBack);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View className="items-center justify-center flex-1">
      <Text className="text-2xl font-bold text-center text-primary">
        Donación parroquia Tres Avemarías.
      </Text>
      <Text className="text-lg text-center">
        Al presionar el boton de pago, sera redirigido a la pagina de pago
      </Text>
      <Text>Valor: </Text>
      <Text className="text-2xl font-bold">20.000 COP</Text>
      <Button title="Pagar" onPress={handlePayment} />
    </View>
  );
}
