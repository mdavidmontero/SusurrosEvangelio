import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import { SlidesScreen } from "../components/ui/SlidesScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BotonUserNavigator } from "./NavigationConfig";
import { logout } from "../../actions/auth.actions";
import { UbicacionScreen } from "../screens/home/UbicacionScreen";

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
          drawerLabel: "Ubicación",
          drawerLabelStyle: { display: "none" },
          drawerActiveBackgroundColor: "white",
        }}
      />

      <Drawer.Screen
        name="Slide"
        component={SlidesScreen}
        options={{
          drawerLabel: "Configuración",
        }}
      />
      <Drawer.Screen
        name="Cerrar Sesión"
        component={UbicacionScreen}
        options={{
          drawerLabel: "Ubicación",
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

      <DrawerItemList {...props} />
      {/* <Button onPress={handleLogout}>Salir</Button> */}
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
    marginBottom: 10,
  },
  infoProfile: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
