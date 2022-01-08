import React from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../utils/Colors';
import { width, height, statusBarHeight } from '../utils/Constants'
import fontStyles from '../utils/FontStyles';
import IsphoneX from '../utils/IsPhoneX'
import {Ionicons, Feather, Entypo} from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';

const authRequest = new AuthRequest({
  responseType: ResponseType.Token,
    clientId: 'f68026533f594d8b8aecbfdae130d266',
    scopes: ['user-read-email', 'user-read-recently-played'],
    usePKCE: false,
    redirectUri: 'exp://localhost:19000/--/',
});

import { ResponseType, AuthRequest } from 'expo-auth-session'; // SPOTIFY: BU LAZIM

// SPOTIFY: BU LAZIM
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

// SPOTIFY: BU LAZIM GIBI AMA COK DA DEGIL
async function getRecentTracks(accessToken){
  let options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }
  let response = await fetch('https://api.spotify.com/v1/me/player/recently-played', options);
  let body = await response.json();

  return body;
}

// SPOTIFY: BU LAZIM
async function getPlaylist(id, accessToken){
  let options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }
  let response = await fetch('https://api.spotify.com/v1/playlists/' + id, options);
  let body = await response.json();

  return body;
}

// SPOTIFY: BU LAZIM
async function getAllPlaylists(accessToken){
  let playlistIds = ['4EbiD7z0FikP00YGNP263m', '06VsGC8oZ4sQcGwSYL4g1b', '6dvCzrH94Nq0pWdEtlyzvl'];

  let playlists = [];

  for(let playlistId of playlistIds){
    let body = await getPlaylist(playlistId, accessToken);
    playlists.push(body);
  }

  return playlists;
}

async function searchTracks(query, accessToken){
  let fetchUrl = encodeURI('https://api.spotify.com/v1/search?q=' + query + '&type=track&market=TR&limit=10&offset=0');

  let options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }
  let response = await fetch(fetchUrl, options);
  let body = await response.json();

  console.log(body);

  return body.tracks.items;
}

export default class Tab2 extends React.PureComponent {
  constructor(props){
    super(props)

    this.tabValue = new Animated.Value(0)
    this.spotifyOpacityValue = new Animated.Value(1)

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
      myList: [0,1,2,3],
      trackObjects: [],
      playlist: [],
      accessToken: null,
      showSpotifyView: true
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

  makeCall = async() => {
    let response = await authRequest.promptAsync(discovery);
    if (response?.type === 'success') {
      this.setState({accessToken: response.params.access_token})
      console.log(response.params.access_token);

      getAllPlaylists(response.params.access_token)
      .then(playlists=>{
        this.setState({playlists: playlists},()=>{
          this.animateSpotifyView(0)
        })
      });
    }
  }

  onSearchChange = (text) => {
    if(text.length < 3){
      return;
    }
    searchTracks(text, this.state.accessToken)
        .then(tracks=>{

          let trackObjects = [];

          for(let track of tracks){
            let artistName = track.artists[0].name;
            let durationSec = Math.round(track.duration_ms / 1000);
            let songDuration = [Math.floor(durationSec / 60), durationSec % 60];
            let songName = track.name;
            let albumImage = track.album.images[0].url;

            trackObjects.push({
              artistName, songDuration: String(songDuration[0]) + ":" + String(songDuration[1]).padStart(2, '0'),
              songName, albumImage, id: track.id, url: track.external_urls.spotify,
            })
          }

          this.setState({trackObjects: trackObjects});
        });
  }


  header = () => {
    return (
      <View style={styles.header}>
        <Text style={[fontStyles.largeTitleLight, {color: Colors.pepsiDarkBlue.alpha1}]}>
          KazandiRio
        </Text>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.pepsiBlue.alpha1} />
          <TextInput
            style={[fontStyles.body, styles.textInput]}
            placeholder='Arayan Bulur'
            onChangeText={this.onSearchChange}
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

  animateSpotifyView = (value) => {
    Animated.timing(this.spotifyOpacityValue, {
      toValue: value,
      duration: 250,
      useNativeDriver: true
    }).start(()=>{
      this.setState({showSpotifyView: false})
    })
  }

  modal = () => {
    return(
      <Animated.View style={styles.modalContainer}>
        
      </Animated.View>
    )
  }

  screen1 = () => {
    return (
      <View style={[styles.screenContainer]}>
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

                    <TouchableOpacity style={styles.cancelButtonRow}>
                      <Feather name="x" color={Colors.pepsiBlack.alpha1} size={18}/>
                    </TouchableOpacity>
                  </TouchableOpacity>
                )
              })
            }

          </View>
          
        </ScrollView>
        {
          this.state.showSpotifyView &&
          <Animated.View style={[styles.spotifyContainer, {opacity: this.spotifyOpacityValue}]}>
            <Text style={[fontStyles.title1, {color: Colors.pepsiBlack.alpha1, alignSelf: 'center'}]}>
              {"Dinle Kazan!"}
            </Text>
            <Text style={[fontStyles.body, {color: Colors.pepsiGrayText.alpha1, marginTop: width * 0.075, alignSelf: 'center', textAlign: 'center', lineHeight: 25, fontWeight: '400'}]}>
              {'Spotify hesabına bağlan, listeni oluştur ve şarkı dinleyerek kazanmaya başla.'}
            </Text>
            <TouchableOpacity style={styles.spotifyButton} activeOpacity={0.9} onPress={this.makeCall}>
              <Entypo name='spotify-with-circle' size={22} color='white'/>
              <Text style={[fontStyles.body, {color: 'white', marginLeft: width * 0.033}]}>
                {"Spotify'a Bağlan"}
              </Text>
            </TouchableOpacity>
            {/* BURAYA AMKK */}
          </Animated.View>
        }

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
  },
  spotifyButton: {
    width: width * 0.7,
    height: 54,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1DB954',
    flexDirection: 'row',
    alignSelf: 'center',
    shadowColor:  '#1DB954',
    shadowOpacity: 1,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 10,
    marginTop: width * 0.15
  },
  spotifyContainer: {
    justifyContent: 'center', 
    paddingHorizontal: width * 0.1, 
    position: 'absolute', 
    backgroundColor: 'white', 
    height: '100%', 
    width: width
  },
  modalContainer: {
    width: width,
    height: height * 0.8,
    backgroundColor: Colors.white.alpha1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  }
})