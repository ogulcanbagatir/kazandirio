import React, { useState } from 'react';
import { StyleSheet, View , Text, TouchableOpacity, TextInput } from 'react-native';
import Colors from '../utils/Colors';
import { width } from '../utils/Constants'
import fontStyles from '../utils/FontStyles';
import Constants  from 'expo-constants';
import BackButton from '../components/BackButton';
import API from '../utils/API'

export default function PhoneLogin(props){
  const [phoneNumber, setPhoneNumber] = useState('')
  const [policy, setPolicy] = useState(false)

  const login = () => {
    let num = '5' + phoneNumber
    console.log(num)
    API.submitPhoneNumber(num).then((res)=>{
      if(res.isValid){
        props.navigation.navigate('LoginOTP', {phoneNumber: num})
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={[fontStyles.title2, {color: Colors.pepsiBlack.alpha08, alignSelf: 'center'}]}>
        {'Giriş Yap'}
      </Text>
      <Text style={[fontStyles.body, {color: Colors.pepsiBlack.alpha08, marginTop: width * 0.075, textAlign: 'center', lineHeight: 28,}]}>
        {'KazandıRio fırsatlarından yararlanmak için giriş yap'}
      </Text>
      <Text style={[fontStyles.body, {color: Colors.pepsiBlack.alpha08, marginTop: width * 0.1}]}>
        {'Telefon numaranı gir:'}
      </Text>
      <View style={styles.inputContainer}>
        <Text style={[fontStyles.title2, {color: Colors.pepsiBlack.alpha08}]}>
          05
        </Text>
        <TextInput 
          style={[styles.input, fontStyles.title2, { color: Colors.pepsiBlack.alpha08 }]}
          onChangeText={(text)=> setPhoneNumber(text)}
          keyboardType='decimal-pad'
        />
      </View>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: width * 0.1}}>
          <TouchableOpacity activeOpacity={0.9} style={[styles.toggle, {backgroundColor: policy ? Colors.pepsiGreen.alpha1 : Colors.pepsiText.alpha1}]} onPress={()=>setPolicy(policy => !policy)}/>
          <Text style={[fontStyles.body, {color: Colors.pepsiBlack.alpha08, marginLeft: 12, flex: 1}]}>
            Uygulama Kullanım Koşulları'nı ve KVKK Kapsamında Aydınlatma Metni'ni okudum, anlıyorum.
          </Text>
        </View>
        <TouchableOpacity style={[styles.loginButton, {backgroundColor: !policy || phoneNumber.length !== 9 ? Colors.pepsiGray.alpha1 : Colors.pepsiDarkBlue.alpha1}]} activeOpacity={0.9} onPress={login} disabled={!policy || phoneNumber.length !== 9}>
          <Text style={[fontStyles.body, {color: 'white'}]}>
            Giriş Yap
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
    paddingTop: Constants.statusBarHeight + 54,
    paddingHorizontal: width * 0.066
  },
  input: {
    flex: 1,

  },
  inputContainer: {
    flexDirection: 'row', 
    width: '100%', 
    borderBottomWidth: 1, 
    borderColor: Colors.pepsiBlack.alpha07,
    paddingVertical: width * 0.033,
  },
  toggle: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  loginButton: {
    height: 44,
    width: '100%',
    borderRadius: 100,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: width * 0.1,
    shadowColor: Colors.pepsiBlack.alpha1,
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 1,
    justifyContent: 'center'
  }
})