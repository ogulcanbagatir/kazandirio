import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
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
    this.state={
      selectedTab: 0
    }
  }

  onTabPressed = (index) => {
    this.setState({selectedTab: index}, () => {
      this.scrollRef.scrollTo({x: width * index, y: 0, animated: false})
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <ScrollView 
          style={{flex: 1}}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          ref={ref => this.scrollRef = ref}
        >
          <Tab1 navigation={this.props.navigation}/>
          <Tab2 navigation={this.props.navigation}/>
          <Tab3 navigation={this.props.navigation}/>
        </ScrollView>
        <View style={styles.tabContainer}>
          <TouchableOpacity activeOpacity={1} style={[styles.tabButton]} onPress={()=>this.onTabPressed(0)}>
            <Ionicons size={24} name='home' color={this.state.selectedTab === 0 ? Colors.pepsiDarkBlue.alpha1 : Colors.secondaryDark.alpha1}/>
            <Text style={[FontStyles.footnoteBold, {color: this.state.selectedTab === 0 ? Colors.pepsiDarkBlue.alpha1 : Colors.secondaryDark.alpha1, marginTop: 5}]}>
              Kampanyalar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1} style={styles.tabButton} onPress={()=>this.onTabPressed(1)}>
            <View style={styles.iconContainer}>
              <Ionicons size={30} name={this.state.selectedTab == 1 ? "headset" : "headset-outline"} color={'white'}/>
            </View>
            <Text style={[FontStyles.footnoteBold, {color: Colors.secondaryDark.alpha1, marginTop: width * 0.075}]}>
              KazandiRio
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1} style={styles.tabButton} onPress={()=>this.onTabPressed(2)}>
            <Ionicons size={24} name='wallet' color={this.state.selectedTab === 2 ? Colors.pepsiDarkBlue.alpha1 : Colors.secondaryDark.alpha1}/>
            <Text style={[FontStyles.footnoteBold, {color: this.state.selectedTab === 2 ? Colors.pepsiDarkBlue.alpha1 : Colors.secondaryDark.alpha1, marginTop: 5}]}>
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
  }
})