import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import API from './utils/API'
import {UserContextProvider} from './utils/Context'
import { useEffect, useState } from 'react';


const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(user){
      setLoading(false)
    }
  },[user])

  useEffect(()=>{
    API.getCurrentUser().then((user)=>{
      if(user){
        setUser(user)
      }else{
        setLoading(false)
      }
    })
  },[])

  if(loading){
    return null
  }

  return (
    <NavigationContainer>
      <UserContextProvider user={user}>
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}} >
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="CampaignDetails" component={CampaignDetails}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="PhoneLogin" component={PhoneLogin}/>
          <Stack.Screen name="LoginOTP" component={LoginOTP}/>
          <Stack.Screen name="SetProfile" component={SetProfile}/>
          <Stack.Screen name="Profile" component={Profile}/>

        </Stack.Navigator>
      </UserContextProvider>
    </NavigationContainer>
  );
}

import Home from './screens/Home';
import CampaignDetails from './screens/CampaignDetails';
import Login from './screens/Login';
import PhoneLogin from './screens/PhoneLogin';
import LoginOTP from './screens/LoginOTP';
import SetProfile from './screens/SetProfile';
import Profile from './screens/Profile';


