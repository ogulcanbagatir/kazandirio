import React from 'react';
import { StyleSheet, View , Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../utils/Colors';
import { width, height } from '../utils/Constants'
import Constants  from 'expo-constants';
import {Feather} from '@expo/vector-icons'

export default function BackButton(props){
  const onPress = () => {
    if(props.onPress){
      props.onPress()
    }else{
      props.navigation.goBack()
    }
  }
  return (
    <TouchableOpacity style={[styles.container, props.style]} activeOpacity={0.9} onPress={onPress }>
      <Feather name='x' size={20} color='white'/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.pepsiDarkBlue.alpha1,
    position: 'absolute',
    right: width * 0.066,
    top: Constants.statusBarHeight + 20,
    shadowColor: Colors.pepsiDarkBlue.alpha1,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 1
  }
})