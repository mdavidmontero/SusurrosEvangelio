import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import { useAuthStore } from "../store/useAuthStore";
import UserNavigator from "./UserNavigation";
import AdminNavigator from "./AdminNavigator";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { SplashScreenInicial } from "../components/plash/PlashScreen";

const Stack = createStackNavigator();
const MainNavigator = () => {
  const { user } = useAuthStore();
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  if (!appIsReady) {
    return <SplashScreenInicial />;
  }

  return (
    <Stack.Navigator>
      {user?.roles === "ADMIN" ? (
        <Stack.Screen
          name="Admin"
          component={AdminNavigator}
          options={{ headerShown: false }}
        />
      ) : user?.roles === "CLIENTE" ? (
        <Stack.Screen
          name="User"
          component={UserNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
