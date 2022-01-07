import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { width, height } from '../utils/Constants'

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
    height: height - 54
  }
})