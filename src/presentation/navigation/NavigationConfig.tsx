import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import { EspiritualScreen } from "../screens/Espiritual/EspiritualScreen";
import { EnlaceScreen } from "../screens/Enlace/EnlaceScreen";
import { ConocenosScreen } from "../screens/Conocenos/ConocenosScren";
import { HomeScreen } from "../screens/home/HomeScreen";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { EvangelizacionScreen } from "../screens/Evangelizacion/EvangelizacionScreen";

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
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          height: 65,
        },
        tabBarLabelStyle: {
          color: "white",
          fontSize: 12,
          marginBottom: 8,
        },
        tabBarIconStyle: {
          marginTop: 15,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={22} color="white" />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Espiritual"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat" size={22} color="white" />
          ),
        }}
        component={EspiritualScreen}
      />
      <Tab.Screen
        name="Enlace"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="link" size={22} color="white" />
          ),
        }}
        component={EvangelizacionScreen}
      />
      <Tab.Screen
        name="Conocenos"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="cross" size={22} color="white" />
          ),
        }}
        component={ConocenosScreen}
      />
    </Tab.Navigator>
  );
}
