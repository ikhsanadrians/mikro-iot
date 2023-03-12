import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,Image, KeyboardAvoidingView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons,MaterialCommunityIcons,Feather} from '@expo/vector-icons';
import { HomePages,WidgetPages,SettingPages} from "./components/NestedNavigation";
import Icon from "./assets/icons/mikroAPP.png";
import CostumHeader from "./components/header";
import { useFonts } from "expo-font";
import { Surface } from "react-native-paper";



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  
    const [fontsLoaded] = useFonts({
      'Jakarta': require('./assets/fonts/jakarta.ttf'),
      'Inter': require('./assets/fonts/inter.ttf'),
      'Rubik': require('./assets/fonts/rubik.ttf'),
      'InterSemi': require('./assets/fonts/interFamily/InterSemiBold.ttf'),
    });
 
    if (!fontsLoaded) {
      return null;
    }
  

  return (
    <NavigationContainer>
            <StatusBar backgroundColor="white" />

      <Tab.Navigator initialRouteName="Home"
       screenOptions={{
        tabBarHideOnKeyboard:true
       }}
      >
        <Tab.Screen name="Settings" component={SettingPages}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'ios-settings-sharp' : 'ios-settings-outline'} size={24} color={focused ? '#239ffb' : '#8C8C8E'} />
          ),
          header:() => (
            <CostumHeader/>
          ),
        }}

        />
           <Tab.Screen
        name="Home"
        component={HomePages}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'md-home-sharp' : 'md-home-outline'} size={24} color={focused ? '#239ffb' : '#8C8C8E'} />
          ),
          header: () => (
            <CostumHeader/>
          )
        }}


        />
           <Tab.Screen name="Widget" component={WidgetPages}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'widgets' : 'widgets-outline'} size={24} color={focused ? '#239ffb' : '#8C8C8E'} />
          ),
          header: () => (
            <CostumHeader/>
          )
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
