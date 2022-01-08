import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    backgroundColor: 'green',
    width: width,
    height: height - (IsphoneX ? 64 + 20 : 64)
  }
})