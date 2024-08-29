import { Alert, Text, useWindowDimensions, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { RootStackParams } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { RolUsuario, User } from "../../../domain/entities/user";
import { login } from "../../../actions/auth.actions";
import { obtenerUsuarioPorId } from "../../../actions/user.action";

export const LoginScreen = () => {
  const [isPosting, setisPosting] = useState(false);

  const { top } = useSafeAreaInsets();
  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();
  const [user, setUser] = useState({
    correo: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (user.correo.length === 0 || user.password.length === 0) {
      return;
    }
    const wasSuccessful = await login(user.correo, user.password);
    console.log(wasSuccessful);
    setisPosting(true);
    try {
      if (wasSuccessful) {
        const user = await obtenerUsuarioPorId(wasSuccessful);
        if (user) {
          setUser(user);
        } else {
          Alert.alert("Error", "No se encontró el usuario.");
        }
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Credenciales incorrectas. Por favor, verifica tus datos e intenta de nuevo."
      );
    }
    setisPosting(false);
  };

  return (
    <View
      style={{ paddingTop: top }}
      className="flex-1 bg-white justify-center items-center p-4"
    >
      <Text className="text-primary text-base">
        ¿Es tu primera vez?{" "}
        <Text
          onPress={() => navigation.navigate("RegisterScreen")}
          className="text-primary font-bold underline italic"
        >
          Regístrate
        </Text>
      </Text>
      <View className="w-full mt-6">
        <TextInput
          mode="flat"
          underlineStyle={{ display: "none" }}
          placeholderTextColor="gray"
          className="mb-6 rounded-3xl border border-gray-300 bg-white"
          placeholder="Gmail"
          onChangeText={(text) => {
            setUser({ ...user, correo: text });
          }}
        />
        <TextInput
          mode="flat"
          underlineStyle={{ display: "none" }}
          placeholderTextColor="gray"
          secureTextEntry
          placeholder="Contraseña"
          className="mb-6 rounded-3xl border border-gray-300 bg-white"
          onChangeText={(text) => {
            setUser({ ...user, password: text });
          }}
        />
      </View>
      <Text className="text-gray-500 underline mb-4">
        Olvidaste tu Contraseña
      </Text>
      <Button
        onPress={handleSubmit}
        mode="contained"
        className="bg-primary w-1/2 mb-8"
        disabled={isPosting}
      >
        Iniciar Sesión
      </Button>
      <View className="flex-col justify-center items-center mt-6">
        <Text className="mb-4 italic">Regístrate con</Text>
        <View className="flex-row space-x-8">
          <FontAwesome name="google-plus-circle" size={50} color="#7E1710" />
          <AntDesign
            name="apple1"
            size={35}
            color="#FFF"
            style={{
              backgroundColor: "#7E1710",
              borderRadius: 25,
              width: 50,
              height: 50,
              textAlign: "center",
              paddingTop: 5,
            }}
          />
          <Entypo name="facebook-with-circle" size={50} color="#7E1710" />
        </View>
      </View>
    </View>
  );
};
