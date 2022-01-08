import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { width, height } from '../utils/Constants'
import Colors from '../utils/Colors'
import FontStyles from '../utils/FontStyles'
import IsphoneX from '../utils/IsPhoneX'
import Constants  from 'expo-constants';
import fontStyles from '../utils/FontStyles';
import {Ionicons} from '@expo/vector-icons'

const buttons = [
  {name: 'Profil Bilgilerim', icon: 'person'},
  {name: 'Bildirimler', icon: 'notifications'},
  {name: 'Sözleşmeler ve Koşullar', icon: 'document'},
  {name: 'Oturumu Kapat', icon: 'log-out'},

]

export default function Profile(props){
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>props.navigation.goBack()}>
          <Ionicons name= 'chevron-back' size={18} color='white'/>
        </TouchableOpacity>
        <Text style={[fontStyles.title2, {color: Colors.pepsiBlack.alpha1}]}>
          {'Profilim'}
        </Text>
      </View>
      {
        buttons.map((item, index)=>{
          return(
            <TouchableOpacity key={index + 'g'} style={styles.row} activeOpacity={0.9} >
              <Ionicons name={item.icon} color={Colors.pepsiDarkBlue.alpha1} size={18}/>
              <Text style={[fontStyles.footnoteLight, {marginLeft: width * 0.02}]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pepsiBg.alpha1
  },
  header: {
    width: width,
    paddingTop: Constants.statusBarHeight + 10,
    height: Constants.statusBarHeight + 54,
    alignItems: 'center',
    backgroundColor:'white'
  },
  row: {
    width: width * 0.8,
    backgroundColor: 'white',
    height: 44,
    alignSelf: 'center',
    marginTop: width * 0.05,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: width * 0.05,
    alignItems: 'center'
  },
  backButton: {
    width :32,
    height: 32,
    borderRadius: 100,
    backgroundColor: Colors.pepsiDarkBlue.alpha1,
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    left: width * 0.066,
    top: Constants.statusBarHeight + 8,
    shadowColor: Colors.pepsiDarkBlue.alpha1,
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 1}

  }
})