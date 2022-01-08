
import React, { useState, useEffect } from 'react';
import { StyleSheet, View , Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import Colors from '../utils/Colors';
import { width, height } from '../utils/Constants'
import fontStyles from '../utils/FontStyles';
import API from '../utils/API'
import {Ionicons} from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';

export default function CampaignDetails(props){
  const {id} = props.route.params
  console.log(id)
  const [campaign, setCampaign] = useState(null)

  useEffect(()=>{
    API.getCampaignDetails(id).then((response)=>{
      console.log(response)
      setCampaign(response)
    })
  },[])

  if(!campaign){
    return (
      <ActivityIndicator color={Colors.pepsiDarkBlue.alpha1}/>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{flex: 1}}
      >
        <StatusBar hidden/>
        <Image style={styles.image} source={{uri: campaign.detailImageUrl}} resizeMode='contain'/>
        <View style={styles.header}>
          <Text style={[fontStyles.title3, {color: Colors.pepsiBlack.alpha1}]}>
            {campaign.name}
          </Text>
          <View style={{flexDirection: 'row', marginTop: width * 0.033, alignItems: 'center'}}>
            <Ionicons name= 'calendar' color={Colors.pepsiDarkBlue.alpha1} size={20}/>
            <Text style={[fontStyles.footnoteLight, {color: Colors.pepsiBlack.alpha1, marginLeft: 8}]}>
            {moment(campaign.campaignStartDate).format('DD.MM.YYYY') + ' - ' + moment(campaign.campaignEndDate).format('DD.MM.YYYY')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: width,
    height: height * 0.37
  },
  header: {
    paddingVertical: width * 0.075,
    paddingHorizontal: width * 0.066,
    borderBottomWidth :0.5,
    borderColor: Colors.pepsiBlack.alpha05
  }
})