import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/UserNavigation";
import { useNavigation } from "@react-navigation/native";

export default function UbicacionScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const churchLocation = {
    latitude: 10.474053608077087,
    longitude: -73.24797027690806,
  };

  // const openInGoogleMaps = () => {
  //   const url = `https://www.google.com/maps/dir/?api=1&destination=${churchLocation.latitude},${churchLocation.longitude}`;
  //   Linking.openURL(url);
  // };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color="#592C00" />
      </TouchableOpacity>
      <Text style={styles.title}>Ubicación</Text>
      <Text style={styles.address}>
        Dirección: Cl. 16b #1162, Valledupar, Cesar
      </Text>
      {/* <TouchableOpacity style={styles.mapButton} onPress={openInGoogleMaps}>
        <Text style={styles.mapButtonText}>Ver en Google Maps</Text>
      </TouchableOpacity> */}
      {/* <MapView
        style={styles.map}
        initialRegion={{
          ...churchLocation,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker coordinate={churchLocation} title={"Iglesia"} />
      </MapView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 10, // Space between the button and title
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
  map: {
    flex: 1,
    borderRadius: 10,
  },
});
