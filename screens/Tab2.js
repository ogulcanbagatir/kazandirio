import React from 'react';
import { Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../utils/Colors';
import { width, height, statusBarHeight } from '../utils/Constants'
import fontStyles from '../utils/FontStyles';
import IsphoneX from '../utils/IsPhoneX'
import {Ionicons, Feather} from '@expo/vector-icons'

export default class Tab2 extends React.PureComponent {
  constructor(props){
    super(props)

    this.tabValue = new Animated.Value(0)

    this.tabLineAnimate = {
      transform: [{
        translateX: this.tabValue.interpolate({
          inputRange: [0,1,2,3],
          outputRange: [0, (width - (width*0.066*2))*0.25, (width - (width*0.066*2))*0.25*2, (width - (width*0.066*2))*0.25*3]
        })
      }]
    }

    this.state = {
      selectedTab: 0
    }
  }

  onPressHeader = (index) => {
    this.setState({selectedTab: index}, () => {
      this.scrollRef.scrollTo({y: 0, x: index*width, animated: false})
      Animated.spring(this.tabValue, {
        toValue: index,
        useNativeDriver: true,
        friction: 9
      }).start()
    })
  }


  header = () => {
    return (
      <View style={styles.header}>
        <Text style={[fontStyles.largeTitleLight, {color: Colors.pepsiDarkBlue.alpha1}]}>
          Kazandirio
        </Text>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.pepsiBlue.alpha1} />
          <TextInput
            style={[fontStyles.body, styles.textInput, {}]}
            placeholder='Arayan Bulur'
            onChangeText={text => {}}
          />
        </View>

        <View style={styles.headerOptions}>
          {
            ["Müzik", "Podcast", "Game", "YouTube"].map((item, index) => {
              return ( 
                <TouchableOpacity key={index + "x" + item} onPress={() => this.onPressHeader(index)} style={styles.headerButton} activeOpacity={0.9}>
                  <Text style={[fontStyles.calloutBold, {color: this.state.selectedTab == index ? Colors.pepsiBlue.alpha1 : Colors.pepsiGray.alpha07}]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
          <Animated.View style={[styles.headerBottomLine, this.tabLineAnimate]}/>
        </View>
      </View>
    )
  }

  screen1 = () => {
    return (
      <View style={styles.screenContainer}>
        <Text style={[fontStyles.title2, {color: Colors.pepsiBlack.alpha1}]}>
          Pepsi Listeleri
        </Text>
      </View>
    )
  }

  screen2 = () => {
    return (
      <View style={[styles.screenContainer, {backgroundColor: "red"}]}>

      </View>
    )
  }

  screen3 = () => {
    return (
      <View style={styles.screenContainer}>

      </View>
    )
  }

  screen4 = () => {
    return (
      <View style={[styles.screenContainer, {backgroundColor: "green"}]}>

      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        
        {this.header()}

        <ScrollView
          ref={ref => this.scrollRef = ref}
          contentContainerStyle={{}}
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.innerContainer}
        >
          {this.screen1()}
          {this.screen2()}
          {this.screen3()}
          {this.screen4()}
        </ScrollView>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container :{
    backgroundColor: Colors.white.alpha1,
    width: width,
    height: height - (IsphoneX ? 64 + 20 : 64)
  },
  header: {
    paddingTop: statusBarHeight,
    width: width,
    paddingHorizontal: width * 0.066,
    paddingTop: width * 0.2,
    borderBottomColor: Colors.pepsiGray.alpha01,
    borderBottomWidth: 0,
  },



  innerContainer: {
    width: width,
    flex: 1,
  },
  screenContainer: {
    width: width,
    flex: 1,  
    paddingHorizontal: width * 0.066,
  },



  searchContainer: {
    width: width * 0.834,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: Colors.pepsiBg.alpha1,
    marginTop: width * 0.033, 
  },
  textInput: {
    flex: 1,
    height: 46,
    marginLeft: 20
  },
  headerOptions: {
    flexDirection: "row",
    width: "100%",
    marginTop: width * 0.033
  },
  headerButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: width * 0.033,
    paddingBottom: width * 0.025,
  },
  headerBottomLine: {
    width: (width - (width * 0.066 * 2))/4,
    position: "absolute",
    bottom: -3,
    height: 4, 
    borderRadius: 10, 
    backgroundColor: Colors.pepsiBlue.alpha1
  }
})