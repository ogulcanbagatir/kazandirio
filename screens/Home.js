import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Platform, Animated, Easing } from 'react-native';
import { width, height } from '../utils/Constants'
import {Ionicons} from '@expo/vector-icons'
import Colors from '../utils/Colors'
import FontStyles from '../utils/FontStyles'
import IsphoneX from '../utils/IsPhoneX'


console.log('width: ' + width)
console.log('height: ' + height)

import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

export default class Home extends React.PureComponent{
  constructor(props){
    super(props)
    this.walletAnimValue = new Animated.Value(0)
    this.walletAnim = {
      transform: [
        {
          scale: this.walletAnimValue.interpolate({
            inputRange: [-1,0,1],
            outputRange: [1.3,1,1.3]

          })
        },
        {
          rotate: this.walletAnimValue.interpolate({
            inputRange: [-1,0,1],
            outputRange: ['-15deg', '0deg', '15deg']

          })
        }
      ]
    }
    this.state={
      selectedTab: 0,
      barStyle: Platform.OS == 'android' ? 'dark-content' : "dark-content",
      isWalletAnimating: false,
      backgroundColor: 'white'
    }
  }

  onTabPressed = (index) => {
    this.setState({
      selectedTab: index, 
      barStyle: index == 1 ? "light-content" : "dark-content",
      backgroundColor: index == 1 ? Colors.pepsiDarkBlue.alpha1 : 'white'
    }, () => {
      this.scrollRef.scrollTo({x: width * index, y: 0, animated: false})
    })
  }

  animateWallet = () => {
    this.walletAnimValue.setValue(0)
    this.setState({isWalletAnimating: true})
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.walletAnimValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.linear
        }),
        Animated.timing(this.walletAnimValue, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.linear

        }),
        Animated.timing(this.walletAnimValue, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.linear

        }),
        Animated.timing(this.walletAnimValue, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.linear

        })
      
      ]),
      {iterations: 2}
    ).start(()=>{
      this.setState({isWalletAnimating: false})
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar barStyle={this.state.barStyle} animated={Platform.OS === 'ios'} backgroundColor={this.state.backgroundColor}/>
        <ScrollView 
          style={{flex: 1}}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          ref={ref => this.scrollRef = ref}
        >
          <Tab1 navigation={this.props.navigation}/>
          <Tab2 
            navigation={this.props.navigation} 
            animateWallet={this.animateWallet}
          />
          <Tab3 navigation={this.props.navigation}/>
        </ScrollView>
        <View style={styles.tabContainer}>
          <TouchableOpacity activeOpacity={1} style={[styles.tabButton]} onPress={()=>this.onTabPressed(0)}>
            <Ionicons size={24} name='home' color={this.state.selectedTab === 0 ? Colors.pepsiDarkBlue.alpha1 : Colors.secondaryDark.alpha1}/>
            <Text style={[FontStyles.footnoteBold, {fontWeight: "600", color: this.state.selectedTab === 0 ? Colors.pepsiDarkBlue.alpha1 : Colors.secondaryDark.alpha06, marginTop: 5}]}>
              Kampanyalar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1} style={styles.tabButton} onPress={()=>this.onTabPressed(1)}>
            <View style={styles.iconContainer}>
              <Ionicons size={30} name={this.state.selectedTab == 1 ? "headset" : "headset-outline"} color={'white'}/>
            </View>
            <Text style={[FontStyles.footnoteBold, {color: this.state.selectedTab === 1 ? Colors.pepsiDarkBlue.alpha1 : Colors.secondaryDark.alpha06, marginTop: width * 0.075}]}>
              Dinle Kazan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.tabButton} onPress={()=>this.onTabPressed(2)}>
            <Animated.View style={this.walletAnim}>
              <Ionicons size={24} name='wallet' color={this.state.isWalletAnimating ? Colors.pepsiYellow.alpha1 : this.state.selectedTab === 2 ? Colors.pepsiDarkBlue.alpha1 : Colors.secondaryDark.alpha1}/>
            </Animated.View>
            <Text style={[FontStyles.footnoteBold, {fontWeight: "600", color: this.state.selectedTab === 2 ? Colors.pepsiDarkBlue.alpha1 : Colors.secondaryDark.alpha06, marginTop: 5}]}>
              Cüzdanım
            </Text>
            
          </TouchableOpacity>
        </View>
      </View>
      
    )
  }
  
}

const styles = StyleSheet.create({
  container :{
    flex: 1,
    backgroundColor: Colors.pepsiBg.alpha1
  },
  tabContainer: {
    width: '100%',
    height: IsphoneX ? 64 + 20 : 64,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: Colors.secondaryDark.alpha01,
    paddingBottom: IsphoneX ? 16 : 0
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  iconContainer: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.15,
    backgroundColor: Colors.pepsiDarkBlue.alpha1,
    position: 'absolute',
    top: -width * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.pepsiDarkBlue.alpha1,
    shadowOffset: {width: 1 , height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.5
  },
  campaignButton: {
    width: width * 0.2,
    height: width * 0.16,
    borderRadius: width * 0.15,
    position: 'absolute',
    bottom: 80,
    right: width * 0.066,
    justifyContent: 'center',
    alignItems: 'center'
  }
})