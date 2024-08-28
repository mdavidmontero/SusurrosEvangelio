import { Button, Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParams } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

export const RegisterScreen = () => {
  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();
  return (
    <ScrollView className="flex-1 bg-white p-6">
      <View className="flex justify-center items-center">
        <View className="w-full mt-6">
          <Text className="mx-2 mb-2 text-gray-500 ">Nombres: </Text>
          <TextInput
            mode="flat"
            underlineStyle={{ display: "none" }}
            placeholderTextColor="gray"
            className="mb-6 rounded-3xl border border-gray-300 h-11 bg-white"
            keyboardType="default"
          />
          <Text className="mx-2 mb-2 text-gray-500 ">Apellidos: </Text>
          <TextInput
            mode="flat"
            underlineStyle={{ display: "none" }}
            placeholderTextColor="gray"
            className="mb-6 rounded-3xl border border-gray-300 h-11 bg-white"
            keyboardType="email-address"
          />
          <Text className="mx-2 mb-2 text-gray-500">Celular: </Text>
          <TextInput
            mode="flat"
            underlineStyle={{ display: "none" }}
            placeholderTextColor="gray"
            className="mb-6 rounded-3xl border border-gray-300 h-11 bg-white"
          />
          <Text className="mx-2 mb-2 text-gray-500">Contraseña: </Text>
          <TextInput
            mode="flat"
            underlineStyle={{ display: "none" }}
            placeholderTextColor="gray"
            secureTextEntry
            placeholder="Contraseña"
            className="mb-6 rounded-3xl border border-gray-300 h-11 bg-white"
          />
        </View>
        <Button
          onPress={() => navigation.navigate("LoginScreen")}
          mode="contained"
          className="bg-primary w-1/2 mb-8"
        >
          Registrar
        </Button>
        <Text className="text-primary text-base">
          ¿Ya eres Miembro?{" "}
          <Text
            onPress={() => navigation.pop()}
            className="text-primary font-bold underline italic"
          >
            Inicia Sesión
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};
