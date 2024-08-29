import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { EspiritualScreen } from "../screens/Espiritual/EspiritualScreen";
import { EnlaceScreen } from "../screens/Enlace/EnlaceScreen";
import { ConocenosScreen } from "../screens/Conocenos/ConocenosScren";

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
        name="Espiritual"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="menufold" size={size} color={"white"} />
          ),
        }}
        component={EspiritualScreen}
      />
      <Tab.Screen
        name="Enlace"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="design-services" size={size} color={"white"} />
          ),
        }}
        component={EnlaceScreen}
      />
      <Tab.Screen
        name="Conocenos"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="design-services" size={size} color={"white"} />
          ),
        }}
        component={ConocenosScreen}
      />
    </Tab.Navigator>
  );
}
