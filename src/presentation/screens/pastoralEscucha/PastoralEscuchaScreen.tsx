import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParams } from "../../navigation/UserNavigation";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getcitaciones } from "../../../actions/citacion.actions";
import { Citacion } from "../../../domain/entities/citacion.entities";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuthStore } from "../../store/useAuthStore";

export default function PastoralEscuchaScreen() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [citaciones, setCitaciones] = useState<Citacion[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchCitaciones = async () => {
      try {
        const fetchedCitaciones = await getcitaciones();
        setCitaciones(fetchedCitaciones);
      } catch (error) {
        console.error("Error fetching citaciones:", error);
      }
    };

    fetchCitaciones();
  }, []);

  return (
    <View className="flex justify-center">
      {user?.roles === "ADMIN" && (
        <Button
          mode="contained"
          className={`${
            user?.roles === "ADMIN"
              ? "absolute top-0 right-0 w-40 h-10 mx-2 mt-5 bg-primary"
              : "relative"
          }`}
          onPress={() =>
            navigation.navigate("NewFormCitacionScreen", { id: "" })
          }
        >
          <Text className="text-white">Nueva Citación</Text>
        </Button>
      )}
      <View
        className={`flex items-center justify-center italic ${
          user?.roles === "ADMIN" ? "mt-20" : "mt-10"
        }`}
      >
        <Text className="text-lg font-bold text-center text-primary ">
          Temas de Citación
        </Text>
        <View className="w-full px-4 mt-4">
          <FlatList
            data={citaciones}
            renderItem={({ item }) => (
              <View className="flex-row items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DetallesCitacionScreen", {
                      id: item.id,
                    })
                  }
                >
                  <Text className="mb-2 text-lg font-semibold text-primary">
                    {item.titulo}
                  </Text>
                  <Text className="text-gray-600">{item.descripcion}</Text>
                </TouchableOpacity>
                {user?.roles === "ADMIN" && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("NewFormCitacionScreen", {
                        id: item.id,
                      })
                    }
                    className="ml-4"
                  >
                    <Ionicons name="create" size={24} color="primary" />
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}
