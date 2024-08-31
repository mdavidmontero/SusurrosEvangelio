import { createStackNavigator } from "@react-navigation/stack";
import { SideMenuNavigator } from "./SideMenuNavigation";
import AdminChatScreen from "../screens/Espiritual/ChatAdminUser";
import { useChatStore } from "../store/chat-store";

export type RootStackParams = {
  Home: undefined;
  AdminChatScreen: { chatId: string };
};

const Stack = createStackNavigator<RootStackParams>();

function UserNavigator() {
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
    </Stack.Navigator>
  );
}

export default UserNavigator;
