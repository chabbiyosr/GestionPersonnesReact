import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Acceuil from "./Screens/Acceuil";
import Authentification from "./Screens/Authentification";
import { NavigationContainer } from "@react-navigation/native";
import SignUp  from "./Screens/SignUp";
import Chat from "./Screens/Chat";



const Stack = createNativeStackNavigator();

export default function App() {


  return (
  <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="authentification" component={Authentification}
    options={{ headerShown:false }}
    ></Stack.Screen>
    <Stack.Screen name="acceuil" component={Acceuil}></Stack.Screen>
    <Stack.Screen name="signup" component={SignUp}></Stack.Screen>
    /* <Stack.Screen name="chat" component={Chat}></Stack.Screen> */

    
    </Stack.Navigator>

  </NavigationContainer>
  );
  
}
   