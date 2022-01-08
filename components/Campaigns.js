import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, FlatList, View , Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import Colors from '../utils/Colors';
import { width, height } from '../utils/Constants'
import fontStyles from '../utils/FontStyles';
import API from '../utils/API'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import CampaignBox from './CampaignBox';

export default function Campaigns(props){
  const [campaigns, setCampaigns] = useState([]) 
  const currentIndex = useSharedValue(0)

  useEffect(()=> {
    API.getCampaings().then((response)=>{
      setCampaigns(response)
    })
  },[])

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event)=> {
      currentIndex.value = event.contentOffset.x / (width * 0.7)
    },
    onMomentumEnd: (event)=> {
      currentIndex.value = Math.round(event.contentOffset.x / (width * 0.7))
    }
  })

  return (
    <View style={{flex: 1}}>
      <Text style={[fontStyles.title2, {color: Colors.pepsiBlack.alpha1, marginLeft: width * 0.05, marginTop: 20}]}>
        {'Kampanyalar'}
      </Text>
      <Animated.ScrollView
        style={{flex: 1, marginTop: 32}}
        data={campaigns}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingRight: width * 0.05}}
        decelerationRate={0.998}
        scrollEventThrottle={16}
        snapToOffsets={
          campaigns.map((item, index) => {
            if(index === 0){
              return  width * 0.65 
            }else if(index === campaigns.length - 1){
              return  width * 0.75 
            }else{
              return width * 0.65 +  width * 0.75 * index
            }
          })
        }
        decelerationRate="fast"
        onScroll={onScroll}
      >
        {
          campaigns.map((item,index)=>{
            return (
              <CampaignBox 
                navigation={props.navigation} 
                key={index + 'campaign'} 
                item={item} 
                index={index} 
                currentIndex={currentIndex} 
              />
            )
          })
        }
      </Animated.ScrollView>
    </View>
    
  )
}

