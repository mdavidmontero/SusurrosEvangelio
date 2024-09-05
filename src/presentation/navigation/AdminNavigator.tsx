import { createStackNavigator } from "@react-navigation/stack";
import { SideMenuNavigator } from "./SideMenuNavigation";
import AdminChatScreen from "../screens/Espiritual/ChatAdminUser";
import { useChatStore } from "../store/chat-store";
import { EvangelizacionScreen } from "../screens/Evangelizacion/EvangelizacionScreen";
import NulidadMatrimonialScreen from "../screens/NulidadMatrimononial/NulidadMatrimonialScreen";

export type RootStackParams = {
  Home: undefined;
  AdminChatScreen: { chatId: string };
  EvangelizacionScreen: undefined;
  NulidadMatrimonialScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

function AdminNavigator() {
  const friend = useChatStore((state) => state.friend);
  const nombre = `${friend?.nombres.toString()}  ${friend?.apellidos.toString()}`;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={SideMenuNavigator} />
      <Stack.Screen
        name="AdminChatScreen"
        options={{
          headerShown: true,
          headerTitle: nombre,
          headerStyle: {
            backgroundColor: "#592C00",
          },
          headerTintColor: "#fff",
        }}
        component={AdminChatScreen}
      />

      <Stack.Screen
        name="EvangelizacionScreen"
        component={EvangelizacionScreen}
      />
      <Stack.Screen
        name="NulidadMatrimonialScreen"
        component={NulidadMatrimonialScreen}
      />
    </Stack.Navigator>
  );
}

export default AdminNavigator;
