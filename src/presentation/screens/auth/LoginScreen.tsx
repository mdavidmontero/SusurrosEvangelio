import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { RootStackParams } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();

  return (
    <View className="flex-1 bg-white justify-center items-center p-4">
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
        />
        <TextInput
          mode="flat"
          underlineStyle={{ display: "none" }}
          placeholderTextColor="gray"
          secureTextEntry
          placeholder="Contraseña"
          className="mb-6 rounded-3xl border border-gray-300 bg-white"
        />
      </View>
      <Text className="text-gray-500 underline mb-4">
        Olvidaste tu Contraseña
      </Text>
      <Button
        onPress={() => {}}
        mode="contained"
        className="bg-primary w-1/2 mb-8"
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
