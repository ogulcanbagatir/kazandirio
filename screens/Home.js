import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { width, height } from '../utils/Constants'
import {Ionicons} from '@expo/vector-icons'
import Colors from '../utils/Colors'
import FontStyles from '../utils/FontStyles'

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
    this.setState({selectedTab: index})
    this.scrollRef.scrollTo({x: width * index, y: 0, animated: false})
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
          <Tab1/>
          <Tab2/>
          <Tab3/>
        </ScrollView>
        <View style={styles.tabContainer}>
          <TouchableOpacity activeOpacity={1} style={[styles.tabButton]} onPress={()=>this.onTabPressed(0)}>
            <Ionicons size={24} name='home' color={this.state.selectedTab === 0 ? Colors.blueDark.alpha1 : Colors.secondaryDark.alpha1}/>
            <Text style={[FontStyles.footnoteBold, {color: this.state.selectedTab === 0 ? Colors.blueDark.alpha1 : Colors.secondaryDark.alpha1, marginTop: 5}]}>
              Kampanyalar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.tabButton} onPress={()=>this.onTabPressed(1)}>
            <Ionicons size={24} name='qr-code' color={this.state.selectedTab === 1 ? Colors.blueDark.alpha1 : Colors.secondaryDark.alpha1}/>
            <Text style={[FontStyles.footnoteBold, {color: this.state.selectedTab === 1 ? Colors.blueDark.alpha1 : Colors.secondaryDark.alpha1, marginTop: 5}]}>
              Okut Kazan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.tabButton} onPress={()=>this.onTabPressed(2)}>
            <Ionicons size={24} name='wallet' color={this.state.selectedTab === 2 ? Colors.blueDark.alpha1 : Colors.secondaryDark.alpha1}/>
            <Text style={[FontStyles.footnoteBold, {color: this.state.selectedTab === 2 ? Colors.blueDark.alpha1 : Colors.secondaryDark.alpha1, marginTop: 5}]}>
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
  },
  tabContainer: {
    width: '100%',
    height: 64,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
})