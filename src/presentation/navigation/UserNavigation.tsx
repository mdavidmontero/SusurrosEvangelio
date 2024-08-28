import { createStackNavigator } from "@react-navigation/stack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { HomeScreen } from "../screens/home/HomeScreen";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { SideMenuNavigator } from "./SideMenuNavigation";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";

export type RootStackParams = {
  Home: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  BotonTabs: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

function UserNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={SideMenuNavigator} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default UserNavigator;

const Tab = createBottomTabNavigator();

export function BotonUserNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: "#592C00",
          shadowOffset: { width: 0, height: 0 },
          shadowColor: "white",
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          position: "absolute",
        },
        tabBarLabelStyle: {
          color: "white",
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={"white"} size={size} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Espiritual"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="menufold" size={size} color={"white"} />
          ),
        }}
        component={RegisterScreen}
      />
      <Tab.Screen
        name="Enlace"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="design-services" size={size} color={"white"} />
          ),
        }}
        component={LoginScreen}
      />
      <Tab.Screen
        name="Conocenos"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="design-services" size={size} color={"white"} />
          ),
        }}
        component={LoginScreen}
      />
    </Tab.Navigator>
  );
}
