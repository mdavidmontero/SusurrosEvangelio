import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/UserNavigation";
import { useNavigation } from "@react-navigation/native";

export default function UbicacionScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const address = "Calle 16B N° 11-62 Barrio Loperena, Valledupar, Cesar";

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color="#592C00" />
      </TouchableOpacity>
      <Text style={styles.title}>Ubicación</Text>
      <Text style={styles.address}>Dirección: {address}</Text>
      <TouchableOpacity style={styles.mapButton} onPress={openInGoogleMaps}>
        <Text style={styles.mapButtonText}>Ver en Google Maps</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#592C00",
  },
  address: {
    fontSize: 16,
    marginBottom: 16,
  },
  mapButton: {
    backgroundColor: "#592C00",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  mapButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
