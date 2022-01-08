import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="CampaignDetails" component={CampaignDetails}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="PhoneLogin" component={PhoneLogin}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

import Home from './screens/Home';
import CampaignDetails from './screens/CampaignDetails';
import Login from './screens/Login';
import PhoneLogin from './screens/PhoneLogin';

