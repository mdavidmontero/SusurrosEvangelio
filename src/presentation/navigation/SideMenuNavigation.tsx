import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  View,
  Text,
  Button,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { SlidesScreen } from "../components/ui/SlidesScreen";
import { BotonUserNavigator } from "./UserNavigation";

export type RootStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const Drawer = createDrawerNavigator();

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
        headerTintColor: "#fff",
        drawerActiveBackgroundColor: "#592C00",
        drawerActiveTintColor: "#fff",
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={BotonUserNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="book" size={24} color="black" />
          ),
          drawerLabel: "Ubicación",
        }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="book" size={24} color="black" />
          ),
          drawerLabel: "Configuración",
        }}
      />
      <Drawer.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="book" size={24} color="black" />
          ),
          drawerLabel: "Ubicación",
        }}
      />
      <Drawer.Screen
        name="Slide"
        component={SlidesScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="book" size={24} color="black" />
          ),
          drawerLabel: "Slide",
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
