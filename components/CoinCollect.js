import React, { useEffect, useState } from 'react';
import { Alert, Animated, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, LayoutAnimation } from 'react-native';
import Colors from '../utils/Colors';
import { width, height, statusBarHeight } from '../utils/Constants'
import fontStyles from '../utils/FontStyles';
import {Ionicons, Feather, Entypo} from '@expo/vector-icons'

export default class extends React.PureComponent {
  constructor(props){
    super(props)
    this.state={
      totalCoins: 384,
      hourLeft: 4
    }
  }

  collectCoins = () => {
    const timeout = setTimeout(() => {
      this.setState({totalCoins: this.state.totalCoins - 24, hourLeft: 12},()=>{
        if(this.state.totalCoins <= 0 ){
          clearTimeout(timeout)
        }else{
          this.collectCoins()
        }
      })
    }, 30);
  }

  render(){
    return(
      <View style={styles.progressContainer}>
        <View>
          <Text style={[fontStyles.title3, {color: Colors.pepsiDarkBlue.alpha1}]}>
            {'Biriken Puan: ' + this.state.totalCoins}
          </Text>
          <View style={{flexDirection: 'row', marginTop: width * 0.02, alignItems: 'center'}}>
            <Feather name='clock' size={15} color={Colors.pepsiDarkBlue.alpha06}/>
            <Text style={[fontStyles.footnoteLight, {color: Colors.pepsiDarkBlue.alpha07, marginLeft: 6}]}>
              {this.state.hourLeft +' saat'}
            </Text>
          </View>
        </View>
        {

        }
        <TouchableOpacity disabled={this.state.totalCoins === 0} style={styles.collectButton} activeOpacity={0.9} onPress={()=>{  
            this.props.animateWallet()
            this.collectCoins()
        }}
        >
          <Image source={require('../assets/lottie/coins.png')} style={{width: 30, marginTop: -1.5, height: 30}} resizeMode='cover'/>
          <Text style={[fontStyles.footnoteBold, {fontWeight: "500", marginLeft: 2, color: Colors.pepsiYellow.alpha1}]}>
            Topla
          </Text>
        </TouchableOpacity>
        
      </View>
    )
  }
  
}


const styles = StyleSheet.create({
  progressContainer: {
    width: width * 0.85,
    paddingVertical: width *0.033,
    backgroundColor:Colors.pepsiYellow.alpha1,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: width * 0.05,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  collectButton: {
    justifyContent: 'center', 
    borderRadius: 12, 
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.pepsiDarkBlue.alpha1,
    shadowColor: Colors.pepsiDarkBlue.alpha1,
    shadowOpacity: 1,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    paddingLeft: 4,
    paddingRight: 16,
    paddingVertical: 4
  },
})