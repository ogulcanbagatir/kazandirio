
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View,Dimensions, Image,Text,TouchableOpacity } from 'react-native';
import Animated, {Extrapolate, interpolate, useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming} from 'react-native-reanimated';
import {clamp} from '../utils/Helper';
import ScaleButton from '../components/ScaleButton'

const {width,height} = Dimensions.get('screen')

export default function Card ({transformVal, index, source, max, children}){
  const scaleVal = useSharedValue(1)

  const transformX = useAnimatedStyle(()=>{
    return {
      transform:[
        {
          translateX: transformVal.value,
        },
        {
          scale: scaleVal.value
        }
      ]
    }
  })

  useAnimatedReaction(()=>{
    return Math.round(transformVal.value / (- width * 0.8))
  },(result,prev)=>{
    let res = clamp(result,0,max)
    if(res === index){
      scaleVal.value = withTiming(1.1)
    }else{
      scaleVal.value = withTiming(1)
    }
  })


  return(
    <Animated.View style={[styles.container,transformX,{marginLeft: index !== 0 ? width * 0.1 : 0}]}>
      <TouchableOpacity style={styles.button} activeOpacity={1}>
        {/* <Image source={source} style={{position: 'absolute', top:0 ,left: 0,right: 0, bottom: 0}} /> */}
        {children}
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 15,
    shadowColor:'black',
    shadowOffset:{
      width: 2,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 1
  },
  button:{
    width:'100%',
    height:'100%',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor:'red'
  }
})