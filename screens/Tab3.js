import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { width, height } from '../utils/Constants'

export default function Tab3(props){
  return (
    <View style={styles.container}>

    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    backgroundColor: 'yellow',
    width: width,
    height: height - 54
  }
})