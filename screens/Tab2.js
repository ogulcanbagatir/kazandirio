import React from 'react';
import { Alert, Animated, Image, Keyboard, Platform, StatusBar, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, LayoutAnimation } from 'react-native';
import Colors from '../utils/Colors';
import { width, height, statusBarHeight } from '../utils/Constants'
import fontStyles from '../utils/FontStyles';
import IsphoneX from '../utils/IsPhoneX'
import {Ionicons, Feather, Entypo} from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import API from '../utils/API'
import MusicRow from'../components/MusicRow'
import {Audio} from 'expo-av'
import CoinCollect from '../components/CoinCollect';
import ConfettiCannon from 'react-native-confetti-cannon';
import {UserContext} from '../utils/Context'
import * as Linking from 'expo-linking';

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
    this.modalValue = new Animated.Value(0)
    this.playingMusic = new Audio.Sound()

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
      myList: [],
      trackObjects: [],
      playlists: [],
      accessToken: null,
      showSpotifyView: true,
      headerPosY: 0,
      playingMusic: null,
      isPlaying: false
    }
  }

  componentDidMount(){
    API.getMySongs().then((songs)=>{
      this.setState({myList: songs})
    })
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
          console.log(playlists)
          this.animateSpotifyView(0)
        })
      });
    }
  }

  onSearchChange = (text) => {
    if(text.length === 0){
      this.setState({trackObjects: []})
    }
    if(text.length < 3){
      return;
    }
    searchTracks(text, this.state.accessToken)
        .then(tracks=>{
          console.log(tracks[0])
          let trackObjects = [];

          for(let track of tracks){
            let artistName = track.artists[0].name;
            let durationSec = Math.round(track.duration_ms / 1000);
            let songDuration = [Math.floor(durationSec / 60), durationSec % 60];
            let songName = track.name;
            let albumImage = track.album.images[0].url;
            let preview_url = track.preview_url
            

            trackObjects.push({
              artistName, songDuration: String(songDuration[0]) + ":" + String(songDuration[1]).padStart(2, '0'),
              songName, albumImage, id: track.id, url: track.external_urls.spotify, previewUrl: preview_url
            })
          }
          console.log(trackObjects)
          this.setState({trackObjects: trackObjects});
        });
  }
  
  transformModal = (value) => {
    if(!this.state.accessToken){
      Keyboard.dismiss()
      Alert.alert("Spotify'?? Ba??la",'??ark?? ekleyeblimek i??in Spotify hesab??n??z?? ba??lamal??s??n??z.', [
        {
          text: "Spotify'?? Ba??la",
          onPress: this.makeCall
        },
        {
          text: 'Kapat' ,
        }
      ])
    }else{
      if(value === 0){
        this.searchInputRef.clear()
        this.setState({trackObjects: []})
      }

      Animated.timing(this.modalValue, {
        toValue: value,
        duration: 250,
        useNativeDriver: true
      }).start()
    }
  }

  header = (user) => {
    return (
      <View style={styles.header}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: width * 0.868}}>
          <Image source={require("../assets/kazandirioLogo.png")} style={{width: width * 0.35, opacity: 0.95, alignItems: "center", height: width * 0.35 * 0.271062271,}} resizeMode='contain' />
          <TouchableOpacity activeOpacity={0.9} style={styles.loginButton} onPress={()=>this.props.navigation.navigate(user ? 'Profile' : 'Login')}>
            <Ionicons name='person-sharp' size={16} color={'white'}/>
          </TouchableOpacity>
        </View>
        
        {/* <Text style={[fontStyles.largeTitleLight, {color: Colors.pepsiYellow.alpha1}]}>
          Dinle Kazan
        </Text>  */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.white.alpha08}/>
          <TextInput
            style={[fontStyles.body, styles.textInput, {color: Colors.white.alpha1, fontWeight: "500"}]}
            placeholder='Ara...'
            placeholderTextColor={Colors.white.alpha03}
            onChangeText={this.onSearchChange}
            onFocus={()=>this.transformModal(1)}
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect={false}
            ref={ref=> this.searchInputRef = ref}
            
          />
          <Animated.View style={{opacity: this.modalValue}}>
            <TouchableOpacity style={styles.closeSearchButton} activeOpacity={0.9} onPress={()=>this.transformModal(0)}>
              <Feather name='x' size={20} color={'white'}/>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.headerOptions} onLayout={(event)=> {
          if(this.state.headerPosY === 0){
            console.log(event.nativeEvent.layout)
            this.setState({headerPosY: event.nativeEvent.layout.y + (IsphoneX ? 84 : 64)})
          }
        }}>
          {
            ["M??zik", "Podcast", "Game", "YouTube"].map((item, index) => {
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
        <ConfettiCannon
          count={80}
          fallSpeed={1000}
          origin={{x: width / 2, y: -700}}
          autoStart={false}
          ref={ref => (this.explosion = ref)}
          colors={[Colors.pepsi.alpha1, Colors.pepsiDarkBlue.alpha1, Colors.pepsiYellow.alpha1, Colors.pepsiDarkOranj.alpha1, Colors.pepsiPurple.alpha1, Colors.pepsiTurquoise.alpha1]}
          fadeOut
          explosionSpeed={1200}
        />
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

  onAddSong = (song) => {
    if(this.state.myList.length === 10){
      Alert.alert('??ark?? Limiti', 'Daha fazla ??ark?? ekleyebilmek i??in puanlar??n?? kullan.', [{
        text: 'Tamam'
      }])
    }

    if( this.state.myList.find(item => song.id === item.id)){
      return
    }

    API.addSongtoMySongs(song).then(()=>{
      let arr = [...this.state.myList]
      arr.push(song)
      this.setState({myList: arr})
    }).catch((e)=>{
      console.log(e)
      Alert.alert('Hata!', 'Bir??eyler ters gitti. L??tfen tekrar deneyiniz.', [
        {
          text: 'Tekrar Dene',
          onPress: ()=> this.onAddSong(song)
        },
        {
          text: 'Kapat'
        }
      ])
    })
  }

  modal = () => {

    const modalHeight = height - this.state.headerPosY
    const modalTransform = {
      transform: [
        {
          translateY: this.modalValue.interpolate({
            inputRange: [0,1],
            outputRange: [0, -modalHeight]
          })
        }
      ]
    }
    return(
      <Animated.View style={[styles.modalContainer, modalTransform, {height: modalHeight, bottom: -modalHeight}]}>
        <Text style={[fontStyles.title3, {color: Colors.pepsiDarkBlue.alpha1, marginLeft: width * 0.066, marginTop: width * 0.066, marginBottom: 8}]}>
          {'M??zik Ara'}
        </Text>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: 10, paddingTop: 16}}
          
        >
          {
            this.state.trackObjects.length === 0 ?
            <Text style={[fontStyles.footnoteBold, {color: Colors.pepsiGray.alpha05, marginHorizontal: width * 0.066}]}>
              {'En az 3 karakterden olu??an bir arama yap??n.'}
            </Text>
            :
            this.state.trackObjects.map((item, index)=>{
              const isSelected = this.state.myList.find(song => song.id === item.id)

              return (
                <MusicRow key={index + 'er'} item={item} index={index} onAddSong={()=>this.onAddSong(item)} isSelected={isSelected}/>
              )
            })
          }
        </ScrollView>
      </Animated.View>
    )
  }

  deleteListRow = (id, index) => {
    API.deleteSongFromMySongs(id).then(()=>{
      let arr = [...this.state.myList]
      arr.splice(index, 1)

      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          500,
          LayoutAnimation.Types.linear,
          LayoutAnimation.Properties.opacity
        )
      );
      
      this.setState({myList: arr})

    }).catch(()=> {
      Alert.alert('Hata!', 'Bir??eyler ters gitti. L??tfen tekrar deneyiniz.', [
        {
          text: 'Tekrar Dene',
          onPress: ()=> this.deleteListRow(id,index)
        },
        {
          text: 'Kapat'
        }
      ])
    })   
  }

  playMusic = (item,index) => {
    if(this.state.isPlaying){
      if(index === this.state.playingMusic){
        this.playingMusic.pauseAsync().then(()=>{
          this.setState({ isPlaying: false})
        })
      }else{
        this.playingMusic.unloadAsync().then(()=>{
          this.playingMusic.loadAsync({uri: item.previewUrl}, {shouldPlay: true}).then(()=>{
            this.setState({playingMusic: index, isPlaying: true})
          })
        })
      }

    }else{
      if(this.state.playingMusic !== null && this.state.playingMusic === index){
        this.playingMusic.playAsync().then(()=>{
          this.setState({ isPlaying: true})
        })
      }else{
        this.playingMusic.unloadAsync().then(()=>{
          this.playingMusic.loadAsync({uri: item.previewUrl}, {shouldPlay: true}).then(()=>{
            this.setState({playingMusic: index, isPlaying: true})
          })
        })
      }
    }
  }

  screen1 = () =>??{
    return (
      <View style={[styles.screenContainer]}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingTop: width * 0.075, paddingBottom: width * 0.1}}
        >
          <CoinCollect animateWallet={()=>{
            this.explosion.start()
            this.props.animateWallet() 
            }} />
          <Text style={[fontStyles.title2, {marginLeft: width * 0.066, color: Colors.pepsiBlack.alpha1}]}>
            Pepsi Listeleri
          </Text>
          <View style={{width: width, alignSelf: "baseline", paddingVertical: width * 0.033, paddingBottom: width * 0.066}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{width: width}}
              contentContainerStyle={{paddingHorizontal: width * 0.066}}
            >
              {
                this.state.playlists.map((item, index) => {
                  return (
                    <TouchableOpacity key={index + "xxx" + index} onPress={() => {Linking.openURL(item.external_urls.spotify)}} style={styles.pepsiCardButton} activeOpacity={1}>
                      <View style={styles.pepsiCardInnerContainer}>
                        <Image source={{uri: item.images[0].url}} style={styles.pepsiCardImage} resizeMode="cover" />
                        <LinearGradient colors={[Colors.pepsiDarkBlue.alpha09, Colors.pepsiDarkBlue.alpha01]} style={styles.pepsiCardGradient} start={[0.5, 1]} end={[0.5, 0]} />
                        
                        <View style={{width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.white.alpha03, justifyContent: 'center', alignItems: "center"}}>
                          <Ionicons name={"play"} color={Colors.pepsiYellow.alpha1} size={20}/>
                        </View>

                        <Text style={[fontStyles.body, {fontWeight: "700", lineHeight: 24, color: Colors.pepsiBg.alpha1, }]}>
                          {item.name.split(" | ")[1]}
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
              this.state.myList.length == 0 ? 
              <View>
                <Text style={[fontStyles.subhead, {fontWeight: "500", color: Colors.pepsiGray.alpha07, marginHorizontal: width * 0.066, lineHeight: 20, marginTop: width * 0.02}]}>
                  Listenize ??ark??lar ekleyerek kazanmaya ba??lay??n.
                </Text>
                <TouchableOpacity activeOpacity={0.9} style={styles.createListButton} onPress={()=>this.transformModal(1)}>
                  <Feather name='plus' size={32} color={Colors.pepsiDarkBlue.alpha1}/>
                  <Text  style={[fontStyles.body, {color: Colors.pepsiDarkBlue.alpha1, marginLeft: 10}]}>
                    {'??ark?? Ekle'}
                  </Text>
                </TouchableOpacity>
              </View>

              :
              this.state.myList.map((item, index) => {
                return (
                  <TouchableOpacity key={index + "ddd"} style={styles.myListRowContainer} onPress={()=>{Linking.openURL(item.url)}}>
                    <TouchableOpacity disabled={!item.previewUrl} style={{width: 44, height: 44, overflow: "hidden", borderRadius: 12, backgroundColor: Colors.pepsi.alpha1, justifyContent: 'center', alignItems: "center"}} onPress={()=>this.playMusic(item, index)}>
                      <Image source={{uri: item.albumImage}} style={{width: 44, height: 44, position: "absolute", top: 0, opacity: 0.55}} resizeMode="cover" />
                      {
                        item.previewUrl &&
                        <Ionicons name={ this.state.playingMusic === index && this.state.isPlaying ? "pause" : "play" }  color={Colors.pepsiYellow.alpha1} size={20}/>
                      }
                    </TouchableOpacity>
                    <View style={{marginLeft: width * 0.033, flex: 1}}>
                      <Text style={[fontStyles.subhead, {color: Colors.pepsiBlack.alpha1, fontWeight: "600", shadowColor: Colors.pepsiDarkBlue.alpha1, shadowOpacity: 0.2, shadowRadius: 3}]}>
                        {item.songName}
                      </Text>
                      <Text style={[fontStyles.footnoteBold, {marginTop: width * 0.02, color: Colors.pepsiGray.alpha1, fontWeight: "600", shadowColor: Colors.pepsiDarkBlue.alpha1, shadowOpacity: 0.2, shadowRadius: 3}]}>
                        {item.artistName + ' ??? ' + item.songDuration}
                      </Text>
                    </View>
                    <TouchableOpacity activeOpacity={1.0} onPress={() => this.deleteListRow(item.id, index) } style={styles.cancelButtonRow}>
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
            {/* <Image source={require("../assets/1.png")} resizeMode='cover' style={{width:  width * 0.125,  height: width* 0.125, left: width * 0.2, top: width * 0.1, position: "absolute"}} />
            <Image source={require("../assets/2.png")} resizeMode='cover' style={{width:  width * 0.1,  height: width* 0.1, left: width * 0.15, top: width * 0.3, position: "absolute"}} />
            <Image source={require("../assets/3.png")} resizeMode='cover' style={{width:  width * 0.1,  height: width* 0.1, right: width * 0.2, top: width * 0.1, position: "absolute"}} />
            <Image source={require("../assets/4.png")} resizeMode='cover' style={{width:  width * 0.1,  height: width* 0.1, right: width * 0.15, top: width * 0.3, position: "absolute"}} /> */}
            <Image source={require("../assets/spotify.png")} resizeMode='cover' style={{width:  width * 0.25, shadowColor: '#1DB954', shadowOpacity: 1, shadowRadius: 6, height: width* 0.25, marginBottom: width * 0.033, alignSelf: "center"}} />
            <Text style={[fontStyles.title1, {color: Colors.pepsiBlack.alpha1, alignSelf: 'center'}]}>
              {"Dinle Kazan!"}
            </Text>
            <Text style={[fontStyles.body, {color: Colors.pepsiGrayText.alpha1, marginTop: width * 0.05, alignSelf: 'center', textAlign: 'center', lineHeight: 25, fontWeight: '400'}]}>
              {'Spotify hesab??na ba??lan, listeni olu??tur ve ??ark?? dinleyerek kazanmaya ba??la.'}
            </Text>
            <TouchableOpacity style={styles.spotifyButton} activeOpacity={0.9} onPress={this.makeCall}>
              <Entypo name='spotify-with-circle' size={22} color='white'/>
              <Text style={[fontStyles.body, {color: 'white', marginLeft: width * 0.033}]}>
                {"Spotify'a Ba??lan"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        }

      </View>
    )
  }

  screen2 = () =>??{
    return (
      <View style={[styles.screenContainer,??{}]}>

      </View>
    )
  }

  screen3 = () =>??{
    return (
      <View style={styles.screenContainer}>

      </View>
    )
  }

  screen4 = () =>??{
    return (
      <View style={[styles.screenContainer, {}]}>

      </View>
    )
  }

  render() {
    return (
      <UserContext.Consumer>
        {
          user =>
          <View style={styles.container}>
        
            {this.header(user)}
  
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
              {this.modal()}
          </View>
        }
      </UserContext.Consumer>
      
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
    width: width,
    backgroundColor: Colors.pepsiDarkBlue.alpha1,
    paddingHorizontal: width * 0.066,
    paddingTop: Platform.OS === 'android' ? (width * 0.075) : (width * 0.2),
    borderBottomColor: Colors.pepsiGray.alpha01,
    borderBottomWidth: 0,
    overflow: 'hidden'
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
    bottom: 4,
    height: 5, 
    borderRadius: 10, 
    backgroundColor: Colors.pepsiYellow.alpha1
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
    marginTop: width * 0.1,
    marginBottom: width *0.1
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
    backgroundColor: Colors.white.alpha1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
  },
  closeSearchButton: {
    height: 46,
    paddingLeft: 6,
    justifyContent: 'center'
  },
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
  createListButton: {
    width: width * 0.85,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.pepsiDarkBlue.alpha1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: width * 0.04,
    alignSelf: 'center',
    marginTop: width * 0.05,
    borderRadius: 120
  },
})