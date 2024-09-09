import { Alert, Image, ScrollView, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { RootStackParams } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
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
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setisPosting(true);
    try {
      const wasSuccessful = await login(user.correo, user.password);
      if (wasSuccessful) {
        const user = await obtenerUsuarioPorId(wasSuccessful);
        if (user) {
          setUser(user);
        } else {
          Alert.alert("Error", "No se encontró el usuario.");
        }
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message ||
          "Credenciales incorrectas. Por favor, verifica tus datos e intenta de nuevo."
      );
    }
    setisPosting(false);
  };

  return (
    <ScrollView style={{ paddingTop: top }} className="flex-1 p-4 bg-white">
      <View className="flex items-center justify-center">
        <Image
          className="w-40 mt-10 h-60"
          source={require("./../../../../assets/diseño-logo.png")}
        />
        <Text className="text-base text-primary">
          ¿Es tu primera vez?{" "}
          <Text
            onPress={() => navigation.navigate("RegisterScreen")}
            className="italic font-bold underline text-primary"
          >
            Regístrate
          </Text>
        </Text>
        <View className="w-full mt-6">
          <TextInput
            mode="flat"
            underlineStyle={{ display: "none" }}
            placeholderTextColor="gray"
            className="mb-6 bg-white border border-gray-300 rounded-3xl"
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
            className="mb-6 bg-white border border-gray-300 rounded-3xl"
            onChangeText={(text) => {
              setUser({ ...user, password: text });
            }}
          />
        </View>

        <Button
          onPress={() => navigation.navigate("ResetPassword")}
          mode="text"
          textColor="#7E1710"
          className="w-1/2 mb-8 underline "
        >
          Restablecer Contraseña
        </Button>
        <Button
          onPress={handleSubmit}
          mode="contained"
          className="w-1/2 mb-8 bg-primary"
          disabled={isPosting}
        >
          Iniciar Sesión
        </Button>
        {/* <View className="flex-col items-center justify-center mt-6">
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
        </View> */}
      </View>
    </ScrollView>
  );
};
