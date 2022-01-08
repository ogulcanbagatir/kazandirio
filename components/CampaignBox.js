import React from 'react';
import { StyleSheet, View , Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../utils/Colors';
import { width, height } from '../utils/Constants'
import fontStyles from '../utils/FontStyles';
import moment from 'moment';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

export default function CampaignBox(props){

  const animatedStyle = useAnimatedStyle(()=> {
    const opacity = interpolate(props.currentIndex.value,
      [props.index - 1, props.index, props.index + 1],
      [0.3, 1, 0.3],
      Extrapolate.CLAMP
    )

    const scale = interpolate(props.currentIndex.value,
      [props.index - 1, props.index, props.index + 1],
      [0.9, 1, 0.9],
      Extrapolate.CLAMP
    )

    return {
      opacity: opacity,
      transform: [
        {
          scale: scale
        }
      ]
    }
  })

  return (
    <Animated.View style={[styles.item, animatedStyle]}>
      <TouchableOpacity style={{flex: 1, }} key={props.index + 'ss'}  activeOpacity={1} onPress={()=>props.navigation.navigate('CampaignDetails', {id: props.item.id})}>
        <Image source={{uri: props.item.imageUrl}} style={styles.image}/>
        <View style={styles.footer}>
          <Text style={[fontStyles.calloutBold, {color: Colors.pepsiBlack.alpha1, marginTop: width * 0.05}]} numberOfLines={1}>
            {props.item.name}
          </Text>
          <Text style={[fontStyles.caption1, {color: Colors.pepsiBlack.alpha05, marginTop: width * 0.033}]} numberOfLines={1}>
            {moment(props.item.campaignStartDate).format('DD.MM.YYYY') + ' - ' + moment(props.item.campaignEndDate).format('DD.MM.YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    width: width * 0.7,
    height: height * 0.5,
    backgroundColor: Colors.pepsiDarkBlue.alpha1,
    borderRadius: 10,
    marginLeft: width * 0.05,
    shadowColor: Colors.pepsiDarkBlue.alpha1,
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.3,
    shadowRadius: 1
  },
  footer: {
    width: '100%',
    paddingHorizontal: width * 0.05,
    backgroundColor: 'white',
    height: height * 0.1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
})