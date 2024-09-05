import { View, Text } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import GestionNulidadMatrimonial from "./GestionNulidadMatrimonial";
import NulidadMatrimonialScreen from "./NulidadMatrimonialScreen";
export default function HomeNulidad() {
  const { user } = useAuthStore();
  return (
    <View className="flex-1 bg-gray-100">
      {user?.roles === "ADMIN" ? (
        <GestionNulidadMatrimonial />
      ) : (
        <NulidadMatrimonialScreen />
      )}
    </View>
  );
}
