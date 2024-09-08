import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BotonUserNavigator } from "./NavigationConfig";
import { logout } from "../../actions/auth.actions";
import UbicacionScreen from "../screens/ubicacion/UbicacionScreen";
import SuscripcionScreen from "../screens/PagoSuscripcion/SuscripcionScreen";

export type RootStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const Drawer = createDrawerNavigator();
const handleLogout = async () => {
  await logout().then(() => {
    console.log("Sesion cerrada");
  });
};

export const SideMenuNavigator = () => {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: dimensions.width >= 758 ? "permanent" : "slide",
        headerShown: true,
        headerStyle: {
          backgroundColor: "#592C00",
          borderRadius: 20,
        },
        headerTitle: "",
        headerTintColor: "#FFF",
        headerRight: () => (
          <MaterialIcons
            name="logout"
            size={25}
            color="white"
            style={{ marginRight: 30 }}
            onPress={handleLogout}
          />
        ),
        drawerStyle: {
          backgroundColor: "#fff",
        },
        drawerActiveBackgroundColor: "#592C00",
        drawerActiveTintColor: "#fff",
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={BotonUserNavigator}
        options={{
          drawerLabel: "Inicio",

          drawerIcon: () => (
            <MaterialIcons name="home" size={22} color="#cd99ae" />
          ),
        }}
      />

      <Drawer.Screen
        name="UbicacionScreen"
        component={UbicacionScreen}
        options={{
          drawerLabel: "Ubicacion",
          drawerIcon: () => (
            <MaterialIcons name="location-pin" size={22} color="#cd99ae" />
          ),
        }}
      />
      <Drawer.Screen
        name="SuscripcionScreen"
        component={SuscripcionScreen}
        options={{
          drawerLabel: "Suscripcion",
          drawerIcon: () => (
            <MaterialIcons name="payment" size={22} color="#cd99ae" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        {/* <Image
          source={
            user?.fotoPerfil === ""
              ? require("../../../assets/no-product-image.png")
              : { uri: user?.fotoPerfil }
          }
          style={styles.profileImage}
        /> */}
      </View>
      <View style={styles.containerText}>
        <Text style={styles.infoProfile}>{"Padre Alfonso Miranda"}</Text>
      </View>

      <View style={styles.drawerOptions}>
        <DrawerItemList {...props} />
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="logout" size={22} color="#cd99ae" />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  profileContainer: {
    height: 200,
    marginVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 100,
  },
  containerText: {
    marginBottom: 20,
    alignItems: "center",
  },
  infoProfile: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#592C00",
  },
  drawerOptions: {
    marginTop: 80,
    paddingHorizontal: 10,
  },
  logoutButton: {
    marginVertical: 10,
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: "#592C00",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left",
  },
});
