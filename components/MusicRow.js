import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Colors from '../utils/Colors';
import { width, height } from '../utils/Constants'
import fontStyles from '../utils/FontStyles';
import React, {useContext, useState} from 'react';
import {Ionicons, Feather, } from '@expo/vector-icons'


export default function MusicRow({ item, onAddSong, isSelected}){

  return (
    <TouchableOpacity  style={styles.myListRowContainer}>
      <View style={{width: 44, height: 44, overflow: "hidden", borderRadius: 12, backgroundColor: Colors.pepsi.alpha1, justifyContent: 'center', alignItems: "center"}}>
        <Image source={{uri: item.albumImage}} style={{width: 44, height: 44, position: "absolute", top: 0, opacity: 0.55}} resizeMode="cover" />
        <Ionicons name={"play"} color={Colors.pepsiYellow.alpha1} size={20}/>
      </View>

      <View style={{marginLeft: width * 0.033, flex: 1}}>
        <Text numberOfLines={2} style={[fontStyles.subhead, {color: Colors.pepsiBlack.alpha1, fontWeight: "600", shadowColor: Colors.pepsiDarkBlue.alpha1, shadowOpacity: 0.2, shadowRadius: 3}]}>
          {item.songName }
        </Text>

        <Text style={[fontStyles.footnoteLight, {color: Colors.pepsiGray.alpha1, fontWeight: "600", shadowColor: Colors.pepsiDarkBlue.alpha1, shadowOpacity: 0.2, shadowRadius: 3, marginTop: 8}]}>
          {item.artistName + ' • ' + item.songDuration}
        </Text>
        
      </View>
      {
        !isSelected ?
        <TouchableOpacity style={[styles.cancelButtonRow, {backgroundColor: Colors.pepsiText.alpha03, borderRadius: 5, marginLeft: 8}]} onPress={onAddSong}>
          <Feather name="plus" color={Colors.pepsiBlack.alpha1} size={18}/>
        </TouchableOpacity>
        :
        <View style={[styles.cancelButtonRow, {backgroundColor: Colors.pepsiGreen.alpha1, borderRadius: 5, marginLeft: 8}]}>
          <Feather name="check" color={Colors.white.alpha1} size={18}/>
        </View>
      }

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  myListRowContainer: {
    width: width * 0.868,
    alignSelf: "center",
    flexDirection: "row",
    paddingVertical: width * 0.025,
    alignItems: "center",
    // backgroundColor: Colors.pepsiBg.alpha1,
    marginBottom: width * 0.033,
  },

  cancelButtonRow: {
    padding: 7,
  },  
})