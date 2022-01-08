import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { width, height } from '../utils/Constants'
import API from '../utils/API'
import Constants from 'expo-constants';
import Colors from '../utils/Colors';
import fontStyles from '../utils/FontStyles';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function Tab3(props){
  const [items,setItems] = useState([])
  const [selected, setSelected] = useState(0)
  const transformVal = useSharedValue(0)

  useEffect(()=>{
    API.getWallet().then((res)=>{
      setItems(res)
    })
  },[])

  const select = (index) => {
    setSelected(index)
    transformVal.value = withSpring(index)
  }

  const transformStyle = useAnimatedStyle(()=> {
    return {
      transform: [
        {
          translateX: interpolate(transformVal.value,
            [0,1],
            [0,width * 0.464]
          ) 
        }
      ]
    }
  })

  const switcher = () => {
    return (
      <View style={styles.switchContainer}>
        <Animated.View style={[styles.indicator, transformStyle ]}/>
        <TouchableOpacity style={styles.switch} onPress={()=>select(0)}>
          <Text style={[fontStyles.body, {color: selected === 0 ? 'white' : Colors.pepsiDarkBlue.alpha1}]}>
            Kampanyalar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.switch} onPress={()=>select(1)}>
          <Text style={[fontStyles.body, {color: selected === 1 ? 'white' : Colors.pepsiDarkBlue.alpha1}]}>
            Geliştir
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{}}
      >
        <View style={styles.header}>
          <Text style={[fontStyles.title2, {color: Colors.pepsiBlack.alpha1, fontWeight: '400'}]}>
            {'Cüzdanım'}
          </Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={[fontStyles.title3, {color: Colors.pepsiBlack.alpha1, fontWeight: '400'}]}>
            Pepsi Puan
          </Text>
          <Text style={[fontStyles.title1, {color: Colors.pepsiBlack.alpha1, fontWeight: '400', marginTop: width * 0.05}]}>
            72000
          </Text>
          {switcher()}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    backgroundColor: Colors.pepsiBg.alpha1,
    width: width,
    height: height - 54
  },
  header: {
    width: width,
    paddingTop: Constants.statusBarHeight ,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: Constants.statusBarHeight + 54,
    shadowColor: Colors.pepsiBlack.alpha1,
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.2,
    shadowRadius: 1
  },
  switchContainer: {
    width: '100%',
    borderRadius: 100,
    height: 44,
    flexDirection: 'row',
    backgroundColor: Colors.pepsiGray.alpha04,
    overflow: 'hidden',
    marginTop: width * 0.05
  },
  switch: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: '50%',
    height: '100%',
    backgroundColor: Colors.pepsiDarkBlue.alpha1,
    position: 'absolute'
  },
  headerContainer: {
    flex: 1, 
    width: width, 
    paddingHorizontal: width * 0.066, 
    marginTop: width * 0.05,
    borderBottomWidth: 1,
    borderColor: Colors.pepsiBlack.alpha05,
    paddingBottom: width * 0.05
  }
})