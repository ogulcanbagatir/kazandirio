import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { width, height } from '../utils/Constants'
import API from '../utils/API'
import Constants from 'expo-constants';
import Colors from '../utils/Colors';
import fontStyles from '../utils/FontStyles';
import {UserContext} from '../utils/Context';
import {Feather} from '@expo/vector-icons'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


export default function Tab3(props){
  const [gifts, setGifts] = useState([])
  const [selected, setSelected] = useState(0)
  const transformVal = useSharedValue(0)
  const [refreshing, setRefreshing] = useState(false)
  const [totalCoin, setTotalCoin] = useState(198)
  const iteration = useRef(0)

  const [actions, setActions] = useState([
    {title: 'Dinleme sınırını yükselt', subText: 'Günlük kazanılan puan kotasını arttır.', coin: 40},
    {title: 'Listeni Genişlet', subText: 'Listene 5 şarkı daha\nekleme hakkı kazan.', coin: 70},
    {title: 'Podcastleri Aç', subText: 'Dinlediğin podcastlerden de puan kazanmaya başla.', coin: 100, shouldRemove: true}
  ])

  const {user, setUser} = useContext(UserContext)

  useEffect(()=>{
    if(user){
      onRefresh()
    }
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

  const spendCoin = (coin) => {
    const timer = setTimeout(() => {
      console.log(iteration.current)
      if(iteration.current === coin){
        iteration.current = 0
        clearTimeout(timer)
      }else{
        setTotalCoin(totalCoin => totalCoin - 1)
        iteration.current++
        spendCoin(coin)
      }
    }, 16);
  } 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[fontStyles.title2, {color: Colors.pepsiBlack.alpha1, fontWeight: '400'}]}>
          {'Cüzdanım'}
        </Text>
      </View>
      <View style={styles.headerContainer}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between",}}>
          <Text style={[fontStyles.title3, {color: Colors.pepsiBlack.alpha1, fontWeight: '400'}]}>
            Pepsi Puan
          </Text>
          <Text style={[fontStyles.title1, {color: Colors.pepsiBlack.alpha1, fontWeight: '700',}]}>
            {totalCoin}
          </Text>
        </View>
        
        {switcher()}
      </View>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: width * 0.15}}
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
      >
        {
          (!user) ?
          <View style={{marginHorizontal: 40, marginTop: 100}}>
            <Text style={{color: 'rgb(70,70,70)', fontSize: 18, textAlign: 'center', lineHeight: 26}}>
              Puanlarınızı ve hediyelerinizi görüntülemek için giriş yapmalısınız.
            </Text>
          </View>
          :
          selected === 0 ?
          //
          <View style={{paddingHorizontal: width * 0.066, width: '100%'}}>  
            {
              gifts.length === 0 ?
              <View style={{marginHorizontal: 40, marginTop: 100}}>
                <Text style={{color: 'rgb(70,70,70)', fontSize: 18, textAlign: 'center', lineHeight: 26}}>
                  Henüz hiçbir hediye kazanmadınız. Hediye kazanmak için PepsiCo ürünlerinden çıkan kodu okutun.
                </Text>
              </View>
              
              :
              gifts.map((item, index)=>{
                return (
                  <View key={index + "dde"} style={styles.gift}>
                    <View style={styles.giftHeader}>
                      <Text style={[fontStyles.footnoteLight, {  marginRight: 20,color: Colors.pepsiDarkBlue.alpha1}]}>
                        {item.campaignName}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingHorizontal: width * 0.033, paddingVertical: width * 0.05, alignItems: 'center',}}>
                      <Image resizeMode='contain' source={{uri: item.imageUrl}} style={{width: width * 0.2, height: width * 0.2}}/>
                      <View style={{marginLeft: width * 0.05, flex: 1}}>
                        <Text style={[fontStyles.body, {color: Colors.pepsiDarkBlue.alpha1, lineHeight: 28, marginRight: 20}]}>
                          {item.name}
                        </Text>
                        <Text style={[fontStyles.subhead2, {color: Colors.pepsiBlack.alpha1, marginTop: width * 0.033, width: '60%'}]}>
                          {item.amount + ' ' + item.benefitType}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.upgradeButton}>
                      <Image source={require('../assets/power-up.png')} style={{width: 30,  height: 30}} resizeMode='cover'/>
                    </TouchableOpacity>
                  </View>
                )
              })
            }
          </View>
          :
          //
          <View style={{flex: 1, width: width}}>
            {
              actions.map((item,index)=>{
                return (
                  <View key={'d' + index} style={styles.improveButton}>
                    <View style={{ flex: 1}}>
                      <Text style={[fontStyles.body, {color: Colors.pepsiDarkBlue.alpha1}]}>
                        {item.title}
                      </Text>
                      <View style={{flexDirection: 'row',  marginTop: width * 0.033, width: '100%'}}>
                        <Feather name={'info'} size={18} color={Colors.pepsiDarkBlue.alpha1} style={{marginTop: 3}}/>
                        <Text style={[fontStyles.footnoteLight, {lineHeight: 18, color: Colors.pepsiDarkBlue.alpha1,  width: '70%', marginLeft: width * 0.02}]}>
                          {item.subText}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={{alignItems: 'center'}} activeOpacity={0.9} onPress={()=>spendCoin(item.coin)}>
                      <Image source={require('../assets/lottie/coins.png')} style={{width: 40, height: 40}}/>
                      <Text style={[fontStyles.body, {color: Colors.pepsiDarkBlue.alpha1}]}>
                        {item.coin}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              })
            }
          </View>
        }
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
    paddingTop: Platform.OS === 'android' ? 0 : Constants.statusBarHeight ,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS === 'android' ? 48 : (Constants.statusBarHeight + 48),
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
    backgroundColor: Colors.pepsiGray.alpha02,
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
    backgroundColor: Colors.pepsiDarkOranj.alpha1,
    position: 'absolute'
  },
  headerContainer: {
    width: width, 
    paddingHorizontal: width * 0.066, 
    paddingTop: width * 0.05,
    borderBottomWidth: 1,
    borderColor: Colors.pepsiGray.alpha05,
    backgroundColor: 'white',
    paddingBottom: width * 0.05
  },
  gift: {
    width: width * 0.868,
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
  },
  upgradeButton: {
    justifyContent: 'center', 
    borderRadius: 12, 
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.pepsiDarkBlue.alpha1,
    shadowColor: Colors.pepsiDarkBlue.alpha1,
    shadowOpacity: 1,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    paddingHorizontal: 16,
    paddingVertical: 4,
    position: 'absolute',
    right: width * 0.033,
    bottom: width * 0.033
  },
  improveButton: {
    width: width * 0.85,
    paddingVertical: width * 0.033,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: width * 0.05,
    paddingHorizontal: width * 0.05,
    shadowColor: Colors.pepsiDarkBlue.alpha1,
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 1,
    flexDirection: 'row'
  }
})