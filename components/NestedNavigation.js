import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../page/HomePage";
import WidgetPage from "../page/WidgetPage";
import SettingPage from "../page/SettingPage";
import FirstStep from "../page/SetUpPage/FirstStep";


const Stack = createStackNavigator()

const HomePages = () => {
    return (
        <Stack.Navigator 
        screenOptions={{
            headerShown:false,
        }}>
         <Stack.Group>
         <Stack.Screen name="Homepage"
            component={HomePage}>
            </Stack.Screen>
            <Stack.Screen name="FirstSetUp" component={FirstStep}></Stack.Screen>
         </Stack.Group>
        </Stack.Navigator> 
    )
}




export {HomePages}

const SettingPages = () => {
    return(
        <Stack.Navigator 
        screenOptions={{headerShown:false}}
        >
            <Stack.Screen name="SettingPage" component={SettingPage}> 
            </Stack.Screen>
        </Stack.Navigator>
    )
}
export {SettingPages};

const WidgetPages = () => {
    return(
        <Stack.Navigator
        screenOptions={{headerShown:false}}>
            <Stack.Screen name="WidgetPage" component={WidgetPage}></Stack.Screen>
        </Stack.Navigator>
    )
}


export {WidgetPages};