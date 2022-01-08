import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../utils/Colors';
import { width, height } from '../utils/Constants'
import IsphoneX from '../utils/IsPhoneX'


export default function Tab2(props){


  return (
    <View style={styles.container}>

    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    backgroundColor: Colors.white.alpha1,
    width: width,
    height: height - (IsphoneX ? 64 + 20 : 64)
  }
})