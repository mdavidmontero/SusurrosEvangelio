import { createStackNavigator } from "@react-navigation/stack";
import { SideMenuNavigator } from "./SideMenuNavigation";
import AdminChatScreen from "../screens/Espiritual/ChatAdminUser";
import { useChatStore } from "../store/chat-store";
import { EvangelizacionScreen } from "../screens/Evangelizacion/EvangelizacionScreen";

import NulidadMatrimonialDetailScreen from "../screens/NulidadMatrimononial/NulidadMatrimonialAdminScreen";
import HomeNulidad from "../screens/NulidadMatrimononial/HomeNulidad";
import PastoralEscuchaScreen from "../screens/pastoralEscucha/PastoralEscuchaScreen";
import NewFormCitacionScreen from "../screens/pastoralEscucha/NewFormCitacionScreen";
import DetallesCitacionScreen from "../screens/pastoralEscucha/DetallesCitacionScreen";
import IglesiaVirtualScreen from "../screens/IglesiaVirtual/IglesiaVirtualScreen";
import { SlidesScreen } from "../components/ui/SlidesScreen";
import EvangelizacionForm from "../screens/Evangelizacion/EvangelizacionForm";
import SuscripcionForm from "../screens/PagoSuscripcion/SuscripcionForm";

export type RootStackParams = {
  Home: undefined;
  AdminChatScreen: { chatId: string };
  EvangelizacionScreen: undefined;

  GestionNulidadMatrimonial: undefined;
  DetalleNulidadMatrimonial: { id: string };
  PastoralEscuchaScreen: undefined;
  NewFormCitacionScreen: { id?: string };
  DetallesCitacionScreen: { id: string };
  IglesiaVirtualScreen: undefined;
  SlidesScreen: undefined;
  EvangelizacionForm: undefined;
  SuscripcionForm: undefined;
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
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#592C00",
          },
          headerTintColor: "#fff",
        }}
        name="EvangelizacionScreen"
        component={EvangelizacionScreen}
      />
      <Stack.Screen name="GestionNulidadMatrimonial" component={HomeNulidad} />
      <Stack.Screen
        name="DetalleNulidadMatrimonial"
        component={NulidadMatrimonialDetailScreen}
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
      />
      <Stack.Screen
        name="DetallesCitacionScreen"
        component={DetallesCitacionScreen}
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
        name="IglesiaVirtualScreen"
        component={IglesiaVirtualScreen}
      />
      <Stack.Screen name="SlidesScreen" component={SlidesScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#592C00",
          },
          headerTintColor: "#fff",
        }}
        name="EvangelizacionForm"
        component={EvangelizacionForm}
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
        name="SuscripcionForm"
        component={SuscripcionForm}
      />
    </Stack.Navigator>
  );
}

export default AdminNavigator;
