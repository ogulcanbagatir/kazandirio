import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../utils/Colors';
import { width, height } from '../utils/Constants'
import fontStyles from '../utils/FontStyles';
import Constants from 'expo-constants';
import {Ionicons} from '@expo/vector-icons'
import Campaigns from '../components/Campaigns';
import IsphoneX from '../utils/IsPhoneX'
import {UserContext} from '../utils/Context'
import React, {useContext} from 'react';

export default function Tab1(props){
  const {user} = useContext(UserContext)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={[fontStyles.body, {color: Colors.secondaryDark.alpha1}]}>
            Merhaba,
          </Text>
          <Text style={[fontStyles.body, {color: Colors.secondaryDark.alpha1, marginTop: 2, fontSize: 20}]}>
            Osman Bey
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.9} style={styles.loginButton} onPress={()=>props.navigation.navigate(user ? 'Profile' : 'Login')}>
          <Ionicons name='person-sharp' size={16} color={'white'}/>
          {
            !user &&
            <Text style={[fontStyles.subhead2, {color: 'white', marginLeft: 4}]}>
              Giriş
            </Text>
          }

        </TouchableOpacity>
      </View>
      <Campaigns navigation={props.navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    width: width,
    height: height - (IsphoneX ? 64 + 20 : 64)
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.066,
    height: Constants.statusBarHeight + 80,
    paddingTop: IsphoneX ?  Constants.statusBarHeight :  Constants.statusBarHeight + 16 ,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  loginButton: {
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.pepsiDarkBlue.alpha1,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 1
  }
})