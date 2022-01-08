import React from 'react';
import { StyleSheet, View , Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../utils/Colors';
import { width, height } from '../utils/Constants'
import fontStyles from '../utils/FontStyles';
import moment from 'moment';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Constants  from 'expo-constants';
import {AntDesign} from '@expo/vector-icons'
import BackButton from '../components/BackButton';

const buttons = [
  {text: 'Facebook hesabını kullan', icon: 'facebook-square', color: Colors.pepsiBlue.alpha1 },
  {text: 'Google+ hesabını kullan', icon: 'googleplus', color: Colors.pepsiRed.alpha1 },
  {text: 'Apple ile giriş yap', icon: 'apple1', color: Colors.pepsiBlack.alpha1 }

]

export default function Login(props){
  return (
    <View style={styles.container}>
      <Text style={[fontStyles.title2, {color: Colors.pepsiBlack.alpha1, alignSelf: 'center'}]}>
        {'Hoş Geldin!'}
      </Text>
      <Text style={[fontStyles.bodyLight, {color: Colors.pepsiBlack.alpha1, alignSelf: 'center', marginTop: width * 0.2}]}>
        Giriş yapmak için;
      </Text>
      {
        buttons.map((item,index)=>{
          return (
            <View key={'loginButton' + index} style={[styles.loginButton, {backgroundColor: item.color}]}>
              <AntDesign name={item.icon} color={'white'} size={20}/>
              <Text style={[fontStyles.body, {color: 'white', marginLeft: width * 0.033}]}>
                {item.text}
              </Text>
            </View>
          )
        })
      }
      <View style={styles.lineContainer}>
        <View style={styles.line}/>
        <Text style={[fontStyles.body, {color: Colors.pepsiBlack.alpha07, marginHorizontal: width * 0.075}]}>
          ya da
        </Text>
        <View style={styles.line}/>
      </View>
      <TouchableOpacity style={styles.phoneButton} activeOpacity={0.9} onPress={()=>props.navigation.navigate('PhoneLogin')}>
        <Text style={[fontStyles.body, {color: Colors.pepsiBlack.alpha07}]} >
          {'Telefon numaran ile giriş yap'}
        </Text>
      </TouchableOpacity>
      <BackButton navigation={props.navigation}/>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 54,
    paddingHorizontal: width * 0.066,
    backgroundColor: Colors.pepsiBg.alpha1
  },
  loginButton: {
    width: width * 0.8,
    height: 54,
    borderRadius: 100,
    paddingHorizontal: width * 0.066,
    flexDirection: 'row',
    marginTop: width * 0.05,
    alignItems: 'center',
    alignSelf :'center',
    shadowColor: Colors.pepsiBlack.alpha1,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {width: 1, height: 1}
  },
  lineContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: width * 0.15,
    alignItems: 'center'
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: Colors.pepsiBlack.alpha07,
  },
  phoneButton: {
    width: width * 0.8,
    height: 54,
    backgroundColor: Colors.white.alpha1,
    alignItems: 'center',
    alignSelf :'center',
    shadowColor: Colors.pepsiBlack.alpha1,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {width: 1, height: 1},
    borderRadius: 100,
    marginTop: width * 0.075,
    justifyContent: 'center'
  }
})