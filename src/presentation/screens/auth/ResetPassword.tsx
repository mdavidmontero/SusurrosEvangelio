import { Text, TextInput, Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { resetPassword } from "../../../actions/auth.actions";
import { useState } from "react";
import { Alert, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/AuthNavigator";
import { useNavigation } from "@react-navigation/native";

export default function ResetPassword() {
  const { top } = useSafeAreaInsets();
  const [email, setEmail] = useState("");

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const handleResetPassword = async () => {
    if (email.length === 0) {
      Alert.alert("Error", "Por favor, ingresa tu correo electrónico.");
      return;
    }
    try {
      await resetPassword(email);
      Alert.alert(
        "Éxito",
        "Se ha enviado un correo para restablecer tu contraseña."
      );
      setEmail("");
    } catch (error) {
      Alert.alert("Error", "Hubo un error al enviar el correo");
    }
  };

  return (
    <View className="flex-1 p-6" style={{ paddingTop: top }}>
      <Text className="mb-6 text-2xl font-bold text-center text-primary">
        Restablecer Contraseña
      </Text>
      <TextInput
        mode="flat"
        placeholder="Correo electrónico"
        value={email}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        cursorColor="gray"
        placeholderTextColor="gray"
        onChangeText={setEmail}
        className="h-5 p-2 mb-3 bg-white border-2 rounded-3xl border-primary"
      />
      <View className="flex items-center gap-2">
        <Button
          mode="contained"
          onPress={handleResetPassword}
          textColor="#FFFFFF"
          className="w-full bg-primary"
        >
          Enviar correo de restablecimiento
        </Button>
        <Button
          onPress={() => navigation.goBack()}
          mode="text"
          textColor="#7E1710"
          className="w-1/2 mb-4 underline"
        >
          <Text className="text-base italic text-primary">Volver</Text>
        </Button>
      </View>
    </View>
  );
}
