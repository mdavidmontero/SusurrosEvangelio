import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import { useAuthStore } from "../store/useAuthStore";
import UserNavigator from "./UserNavigation";

const Stack = createStackNavigator();
const MainNavigator = () => {
  const { user } = useAuthStore();
  return (
    <Stack.Navigator>
      {user?.roles === "ADMIN" ? (
        <Stack.Screen
          name="Admin"
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
