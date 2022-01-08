import React from 'react';
import { Alert, Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../utils/Colors';
import { width, height, statusBarHeight } from '../utils/Constants'
import fontStyles from '../utils/FontStyles';
import IsphoneX from '../utils/IsPhoneX'
import {Ionicons, Feather} from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';


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
      selectedTab: 0,
      myList: [1,2,3,4,5]
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

        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: width * 0.868}}>
          <Image source={require("../assets/kazandirioLogo.png")} style={{width: width * 0.35, opacity: 0.85, alignItems: "center", height: width * 0.35 * 0.271062271,}} resizeMode='contain' />
          <TouchableOpacity activeOpacity={0.9} style={styles.loginButton} onPress={()=>props.navigation.navigate(user ? 'Profile' : 'Login')}>
            <Ionicons name='person-sharp' size={16} color={'white'}/>
          </TouchableOpacity>
        </View>
        
        {/* <Text style={[fontStyles.largeTitleLight, {color: Colors.pepsiYellow.alpha1}]}>
          Dinle Kazan
        </Text>  */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.white.alpha08}/>
          <TextInput
            style={[fontStyles.body, styles.textInput, {fontWeight: "500"}]}
            placeholder='Arayan Bulur'
            placeholderTextColor={Colors.white.alpha04}
            onChangeText={text => {}}
          />
        </View>

        <View style={styles.headerOptions}>
          {
            ["Müzik", "Podcast", "Game", "YouTube"].map((item, index) => {
              return ( 
                <TouchableOpacity key={index + "x" + item} onPress={() => this.onPressHeader(index)} style={styles.headerButton} activeOpacity={0.9}>
                  <Text style={[fontStyles.calloutBold, {color: this.state.selectedTab == index ? Colors.pepsiYellow.alpha1 : Colors.white.alpha04}]}>
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

  deleteListRow = () => {
    Alert.alert("Şarkıyı Kaldır", "Bu şarkıyı listenizden kaldırmak istediğinizden emin misiniz?", [{text: "Kaldır", style: "default"}, {text: "Vazgeç", style: "cancel"}])
  }

  screen1 = () => {
    return (
      <View style={styles.screenContainer}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingVertical: width * 0.075}}
        >
          <Text style={[fontStyles.title2, {marginLeft: width * 0.066, color: Colors.pepsiBlack.alpha1}]}>
            Sana Özel
          </Text>
          <View style={{width: width, alignSelf: "baseline", paddingVertical: width * 0.033, paddingBottom: width * 0.066}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{width: width}}
              contentContainerStyle={{paddingHorizontal: width * 0.066,}}
            >
              {
                [1,2,3,4,5].map((item, index) => {
                  return (
                    <TouchableOpacity key={index + "xxx"} onPress={() => {}} style={styles.pepsiCardButton} activeOpacity={1}>
                      <View style={styles.pepsiCardInnerContainer}>
                        <Image source={require("../assets/messi.jpg")} style={styles.pepsiCardImage} resizeMode="cover" />
                        <LinearGradient colors={[Colors.pepsiDarkBlue.alpha09, Colors.pepsiDarkBlue.alpha01]} style={styles.pepsiCardGradient} start={[0.5, 1]} end={[0.5, 0]} />
                        
                        <View style={{width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.white.alpha03, justifyContent: 'center', alignItems: "center"}}>
                          <Ionicons name={"play"} color={Colors.pepsiYellow.alpha1} size={20}/>
                        </View>

                        <Text style={[fontStyles.body, {fontWeight: "700", lineHeight: 24, color: Colors.pepsiBg.alpha1, }]}>
                          {"Messi'nin Kupa Kaldırırken Dinlediği Şarkılar"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>

          <Text style={[fontStyles.title2, {marginLeft: width * 0.066, color: Colors.pepsiBlack.alpha1}]}>
            Benim Listem
          </Text>
          
          <View style={{width: width}}>
            {
              this.state.myList.map((item, index) => {
                return (
                  <TouchableOpacity style={styles.myListRowContainer}>
                    <View style={{width: 44, height: 44, overflow: "hidden", borderRadius: 12, backgroundColor: Colors.pepsi.alpha1, justifyContent: 'center', alignItems: "center"}}>
                      <Image source={require("../assets/messi.jpg")} style={{width: 44, height: 44, position: "absolute", top: 0, opacity: 0.55}} resizeMode="cover" />
                      <Ionicons name={"play"} color={Colors.pepsiYellow.alpha1} size={20}/>
                    </View>

                    <View style={{marginLeft: width * 0.033, flex: 1}}>
                      <Text style={[fontStyles.subhead, {color: Colors.pepsiBlack.alpha1, fontWeight: "600", shadowColor: Colors.pepsiDarkBlue.alpha1, shadowOpacity: 0.2, shadowRadius: 3}]}>
                        Shakira - Yalan Dünya
                      </Text>
                      
                      <View style={{marginTop: width * 0.033, flexDirection: "row", alignItems: "center"}}>
                        <View style={{overflow: "hidden", width: width * 0.4, height: 4, backgroundColor: Colors.pepsiBg.alpha1, borderRadius: 10}}>
                          <View style={{height: 4, width: width * 0.22, backgroundColor: Colors.pepsi.alpha1}}/>
                        </View>

                        <Text style={[fontStyles.footnoteBold, {fontWeight: "400", marginLeft: 6, marginBottom: 1}]} >
                          %23
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity activeOpacity={1.0} onPress={() => this.deleteListRow() } style={styles.cancelButtonRow}>
                      <Feather name="x" color={Colors.pepsiBlack.alpha1} size={18}/>
                    </TouchableOpacity>
                  </TouchableOpacity>
                )
              })
            }

          </View>
          
        </ScrollView>
        
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
    backgroundColor: Colors.pepsiDarkBlue.alpha1,
    paddingHorizontal: width * 0.066,
    paddingTop: width * 0.2,
    borderBottomColor: Colors.pepsiGray.alpha01,
    borderBottomWidth: 0,
  },

  loginButton: {
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.pepsiDarkBlue.alpha1,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
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

  innerContainer: {
    width: width,
    flex: 1,
  },
  screenContainer: {
    width: width,
    flex: 1,
  },

  pepsiCardButton: {
    marginRight: width * 0.033,
  },
  pepsiCardImage: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 18,
    width: (width * 0.6) - 8,
    height: (width * 0.5) - 8,
    opacity: 0.75
  },
  pepsiCardInnerContainer: {
    overflow: "hidden",
    borderWidth: 4,
    borderColor: Colors.white.alpha01,
    width: width * 0.6,
    height: width * 0.5,
    justifyContent: 'flex-end',
    backgroundColor: Colors.pepsiDarkBlue.alpha1,
    borderRadius: 20,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.04
  },
  pepsiCardGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width * 0.6,
    height: width * 0.5,
  },



  searchContainer: {
    width: width * 0.868,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: Colors.white.alpha02,
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
    marginTop: width * 0.04
  },
  headerButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: width * 0.033,
    paddingBottom: width * 0.05,
  },
  headerBottomLine: {
    width: (width - (width * 0.066 * 2))/4,
    position: "absolute",
    bottom: -2,
    height: 5, 
    borderRadius: 10, 
    backgroundColor: Colors.pepsiYellow.alpha1
  }
})