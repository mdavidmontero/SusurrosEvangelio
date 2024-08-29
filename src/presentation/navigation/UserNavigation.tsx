// src/presentation/navigation/UserNavigation.tsx
import { createStackNavigator } from "@react-navigation/stack";
import { BotonUserNavigator } from "./NavigationConfig";
import { SideMenuNavigator } from "./SideMenuNavigation";

export type RootStackParams = {
  Home: undefined;
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
    </Stack.Navigator>
  );
}

export default UserNavigator;
