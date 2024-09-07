import { createStackNavigator } from "@react-navigation/stack";
import { SideMenuNavigator } from "./SideMenuNavigation";

import { useChatStore } from "../store/chat-store";
import { EvangelizacionScreen } from "../screens/Evangelizacion/EvangelizacionScreen";
import NulidadMatrimonialScreen from "../screens/NulidadMatrimononial/NulidadMatrimonialScreen";
import GestionNulidadMatrimonial from "../screens/NulidadMatrimononial/GestionNulidadMatrimonial";
import HomeNulidad from "../screens/NulidadMatrimononial/HomeNulidad";
import PastoralEscuchaScreen from "../screens/pastoralEscucha/PastoralEscuchaScreen";
import NewFormCitacionScreen from "../screens/pastoralEscucha/NewFormCitacionScreen";
import DetallesCitacionScreen from "../screens/pastoralEscucha/DetallesCitacionScreen";
import IglesiaVirtualScreen from "../screens/IglesiaVirtual/IglesiaVirtualScreen";
import UbicacionScreen from "../screens/ubicacion/UbicacionScreen";
import { SlidesScreen } from "../components/ui/SlidesScreen";
import DetalleNulidadUser from "../screens/NulidadMatrimononial/DetalleNulidadUser";

export type RootStackParams = {
  Home: undefined;
  AdminChatScreen: { chatId: string };
  EvangelizacionScreen: undefined;
  NulidadMatrimonialScreen: undefined;
  GestionNulidadMatrimonial: undefined;
  PastoralEscuchaScreen: undefined;
  NewFormCitacionScreen: { id?: string };
  DetallesCitacionScreen: { id: string };
  IglesiaVirtualScreen: undefined;
  UbicacionScreen: undefined;
  SlidesScreen: undefined;
  DetalleNulidadUser: undefined;
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
        options={{
          headerShown: true,
          headerTitle: "Evangelización",
          headerStyle: {
            backgroundColor: "#592C00",
          },
          headerTintColor: "#fff",
        }}
        name="EvangelizacionScreen"
        component={EvangelizacionScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#592C00",
          },
          headerTintColor: "#fff",
        }}
        name="NulidadMatrimonialScreen"
        component={NulidadMatrimonialScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#592C00",
          },
          headerTintColor: "#fff",
        }}
        name="GestionNulidadMatrimonial"
        component={HomeNulidad}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#592C00",
          },
          headerTintColor: "#fff",
        }}
        name="PastoralEscuchaScreen"
        component={PastoralEscuchaScreen}
      />
      <Stack.Screen
        name="NewFormCitacionScreen"
        component={NewFormCitacionScreen}
        options={{
          headerShown: false,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#592C00",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="DetallesCitacionScreen"
        component={DetallesCitacionScreen}
        options={{
          headerShown: false,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#592C00",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="IglesiaVirtualScreen"
        component={IglesiaVirtualScreen}
      />
      <Stack.Screen name="UbicacionScreen" component={UbicacionScreen} />
      <Stack.Screen name="SlidesScreen" component={SlidesScreen} />
      <Stack.Screen name="DetalleNulidadUser" component={DetalleNulidadUser} />
    </Stack.Navigator>
  );
}

export default UserNavigator;
