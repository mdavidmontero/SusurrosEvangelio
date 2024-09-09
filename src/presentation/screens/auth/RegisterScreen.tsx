import { Button, Text, TextInput } from "react-native-paper";
import { Alert, Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParams } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { registerUser } from "../../../actions/auth.actions";
import { RolUsuario } from "../../../domain/entities/user";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const RegisterScreen = () => {
  const { top } = useSafeAreaInsets();
  const [user, setUser] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    correo: "",
    password: "",
    roles: RolUsuario.CLIENTE,
  });
  const [loading, setLoading] = useState(false);

  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();

  const handleChange = async () => {
    if (
      user.nombre.length === 0 ||
      user.apellidos.length === 0 ||
      user.telefono.length === 0 ||
      user.correo.length === 0 ||
      user.password.length === 0
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    const wasSucessfull = await registerUser(
      user.nombre,
      user.apellidos,
      user.telefono,
      user.correo,
      user.password,
      user.roles
    );
    if (wasSucessfull) {
      navigation.navigate("LoginScreen");
      return;
    }
    setLoading(false);
    Alert.alert("Error", "Error al crear el usuario");
  };
  return (
    <ScrollView className="flex-1 p-6 bg-white">
      <View className="flex items-center justify-center">
        <Image
          className="w-40 mt-10 h-60"
          source={require("./../../../../assets/diseño-logo.png")}
        />
        <View className="w-full">
          <Text className="mx-2 mb-2 text-gray-500 ">Nombres: </Text>
          <TextInput
            mode="flat"
            underlineStyle={{ display: "none" }}
            placeholderTextColor="gray"
            className="mb-6 bg-white border border-gray-300 rounded-3xl h-11"
            keyboardType="default"
            onChangeText={(text) => {
              setUser({ ...user, nombre: text });
            }}
          />
          <Text className="mx-2 mb-2 text-gray-500 ">Apellidos: </Text>
          <TextInput
            mode="flat"
            underlineStyle={{ display: "none" }}
            placeholderTextColor="gray"
            className="mb-6 bg-white border border-gray-300 rounded-3xl h-11"
            keyboardType="default"
            onChangeText={(text) => {
              setUser({ ...user, apellidos: text });
            }}
          />
          <Text className="mx-2 mb-2 text-gray-500">Celular: </Text>
          <TextInput
            mode="flat"
            underlineStyle={{ display: "none" }}
            placeholderTextColor="gray"
            className="mb-6 bg-white border border-gray-300 rounded-3xl h-11"
            keyboardType="number-pad"
            onChangeText={(text) => {
              setUser({ ...user, telefono: text });
            }}
          />
          <Text className="mx-2 mb-2 text-gray-500">Correo: </Text>
          <TextInput
            mode="flat"
            underlineStyle={{ display: "none" }}
            placeholderTextColor="gray"
            className="mb-6 bg-white border border-gray-300 rounded-3xl h-11"
            keyboardType="email-address"
            onChangeText={(text) => {
              setUser({ ...user, correo: text });
            }}
          />
          <Text className="mx-2 mb-2 text-gray-500">Contraseña: </Text>
          <TextInput
            mode="flat"
            underlineStyle={{ display: "none" }}
            placeholderTextColor="gray"
            secureTextEntry
            className="mb-6 bg-white border border-gray-300 rounded-3xl h-11"
            keyboardType="default"
            onChangeText={(text) => {
              setUser({ ...user, password: text });
            }}
          />
        </View>
        <Button
          onPress={handleChange}
          disabled={loading}
          mode="contained"
          className="w-1/2 mb-8 bg-primary"
        >
          Registrar
        </Button>
        <Text className="text-base text-primary">
          ¿Ya eres Miembro?{" "}
          <Text
            onPress={() => navigation.pop()}
            className="italic font-bold underline text-primary"
          >
            Inicia Sesión
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};
