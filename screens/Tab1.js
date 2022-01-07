import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { width, height } from '../utils/Constants'

export default function Tab1(props){
  return (
    <View style={styles.container}>

    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    backgroundColor: 'red',
    width: width,
    height: height - 54
  }
})