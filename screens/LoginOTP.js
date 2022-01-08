import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View , Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import Colors from '../utils/Colors';
import { width } from '../utils/Constants'
import fontStyles from '../utils/FontStyles';
import Constants  from 'expo-constants';
import BackButton from '../components/BackButton';
import API from '../utils/API'

export default function LoginOTP(props){
  const inputRef = useRef(null)
  const [OTP, setOTP] = useState('')

  useEffect(()=>{
    if(OTP.length === 5){
      Keyboard.dismiss()
    }
  },[OTP])

  const login = () => {
    API.submitValidationCode(props.route.params.phoneNumber,OTP).then((res)=>{
      console.log(res)
      props.navigation.navigate('SetProfile')
    })
  }

  return(
    <View style={styles.container}>
      <Text style={[fontStyles.title2, {color: Colors.pepsiBlack.alpha1, fontWeight: '400'}]}>
        Doğrulama Kodu
      </Text>
      <Text style={[fontStyles.body, {color: Colors.pepsiGrayText.alpha1, textAlign: 'center', marginTop: width * 0.1, lineHeight: 25}]}>
        {'0' + props.route.params.phoneNumber + ' numarasına gelen doğrulama kodunu aşağıdaki alana gir'}
      </Text>
      <View style={{width: '100%', marginTop: width * 0.1}}>
        <Text style={[fontStyles.subhead, {color: Colors.pepsiBlack.alpha1,}]}>
          {'Onay kodunu gir:'}
        </Text>
        <TextInput 
          style={[styles.input, fontStyles.body, {color: Colors.pepsiDarkBlue.alpha1}]}
          keyboardType='decimal-pad'
          ref={inputRef}
          onChangeText={(text)=>setOTP(text)}
          autoFocus={true}
          />
        <TouchableOpacity disabled={OTP.length !== 5} style={[styles.loginButton, {backgroundColor: OTP.length === 5 ? Colors.pepsiDarkBlue.alpha1 : Colors.pepsiGray.alpha1}]} onPress={login}>
          <Text style={[fontStyles.body, {color: 'white'}]}>
            Numaramı doğrula
          </Text>
        </TouchableOpacity>
      </View>
      <BackButton navigation={props.navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight + 54,
    paddingHorizontal: width * 0.066
  },
  input: {
    width: '100%',
    height: 44,
    borderBottomWidth: 1,
    borderColor: Colors.pepsiGrayText.alpha1
  },
  loginButton: {
    height: 44,
    width: '100%',
    borderRadius: 100,
    alignItems: 'center',
    marginTop: width * 0.1,
    shadowColor: Colors.pepsiBlack.alpha1,
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})