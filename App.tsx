import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/presentation/navigation/AuthNavigator";
import { PaperProvider } from "react-native-paper";
import MainNavigator from "./src/presentation/navigation/MainNavigation";
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
