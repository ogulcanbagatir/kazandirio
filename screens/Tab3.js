import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { width, height } from '../utils/Constants'
import API from '../utils/API'
import Constants from 'expo-constants';
import Colors from '../utils/Colors';
import fontStyles from '../utils/FontStyles';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function Tab3(props){
  const [gifts, setGifts] = useState([])
  const [selected, setSelected] = useState(0)
  const transformVal = useSharedValue(0)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(()=>{
    onRefresh()
  },[])

  const onRefresh = () => {
    setRefreshing(true)
    API.getWallet().then((res)=>{
      setRefreshing(false)
      setGifts(res)
    })
  }

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
            Hediyeler
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
      <View style={styles.header}>
        <Text style={[fontStyles.title2, {color: Colors.pepsiBlack.alpha1, fontWeight: '400'}]}>
          {'Cüzdanım'}
        </Text>
      </View>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: width * 0.15}}
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
      >
        
        <View style={styles.headerContainer}>
          <Text style={[fontStyles.title3, {color: Colors.pepsiBlack.alpha1, fontWeight: '400'}]}>
            Pepsi Puan
          </Text>
          <Text style={[fontStyles.title1, {color: Colors.pepsiBlack.alpha1, fontWeight: '400', marginTop: width * 0.05}]}>
            72000
          </Text>
          {switcher()}
        </View>
        <View style={{paddingHorizontal: width * 0.066, width: '100%'}}>  
          {
            gifts.map((item, index)=>{
              console.log(item)
              return (
                <View style={styles.gift}>
                  <View style={styles.giftHeader}>
                    <Text style={[fontStyles.footnoteLight, {color: Colors.pepsiDarkBlue.alpha1}]}>
                      {item.campaignName}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', width: '100%', paddingHorizontal: width * 0.033, paddingVertical: width * 0.05, alignItems: 'center',}}>
                    <Image source={{uri: item.imageUrl}} style={{width: width * 0.25, height: width * 0.25}}/>
                    <View style={{marginLeft: width * 0.05}}>
                      <Text style={[fontStyles.body, {color: Colors.pepsiDarkBlue.alpha1}]}>
                        {item.name}
                      </Text>
                      <Text style={[fontStyles.subhead2, {color: Colors.pepsiBlack.alpha1, marginTop: width * 0.05}]}>
                        {item.amount + ' ' + item.benefitType}
                      </Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
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
    backgroundColor: Colors.pepsiGray.alpha05,
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
    paddingTop: width * 0.05,
    borderBottomWidth: 1,
    borderColor: Colors.pepsiGray.alpha05,
    backgroundColor: 'white',
    paddingBottom: width * 0.05
  },
  gift: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: width * 0.05
  },
  giftHeader: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.pepsiGray.alpha03,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.033
  }
})