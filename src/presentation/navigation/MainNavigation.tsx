import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import { useAuthStore } from "../store/useAuthStore";
import UserNavigator from "./UserNavigation";
import AdminNavigator from "./AdminNavigator";

const Stack = createStackNavigator();
const MainNavigator = () => {
  const { user } = useAuthStore();

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
