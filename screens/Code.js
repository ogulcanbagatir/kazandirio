import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Colors from '../utils/Colors';
import { width } from '../utils/Constants'
import Constants from 'expo-constants';
import {UserContext} from '../utils/Context'
import React, {useContext, useState} from 'react';
import fontStyles from '../utils/FontStyles';
import API from '../utils/API'
import {Ionicons} from '@expo/vector-icons'

export default function Code(props){
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  const useCode = () => {
    setLoading(true)
    API.generateCode().then((code)=>{
      console.log(code.code)
      API.useCode(code.code).then((res)=>{
        console.log(res)
        setLoading(false)
        props.navigation.goBack()
      }).catch((e)=>{
        alert('Bir hata oluştu. Lütfen tekrar deneyiniz.')
        setLoading(false)
      })
    })
  }

  return (
    <View style={styles.container}>
      <Text style={[fontStyles.title2, {fontWeight: '500', alignSelf: 'center'}]}>
        {'Şifreyi Kendin Yaz'}
      </Text>
      <Text style={[fontStyles.body, {fontWeight: '400', alignSelf: 'center', marginTop: width * 0.1, textAlign: 'center', lineHeight: 28}]}>
        {'Lütfen aşağıdaki alana 10 haneli şifrenizi giriniz.'}
      </Text>
      <Text style={[fontStyles.body, {fontWeight: '400', marginTop: width * 0.1}]}>
        Şifreyi gir:
      </Text>
      <TextInput
        style={[styles.input, fontStyles.body, {color: Colors.pepsiDarkBlue.alpha1}]}
        placeholder='Şirenizi girin'
        onChangeText={(text)=>setCode(text)}
        autoCapitalize='characters'
        autoComplete='none'
        autoCorrect={false}
        autoFocus
      />
      <TouchableOpacity style={styles.submitButton} activeOpacity={0.9} onPress={useCode}>
        {
          loading ? 
          <ActivityIndicator/>
          :
          <Text style={[fontStyles.body, {fontWeight: '400', color: 'white'}]}>
            {'Şifreyi Gir'}
          </Text>
        }

      </TouchableOpacity> 
      <TouchableOpacity style={styles.backButton} onPress={()=>props.navigation.goBack()}>
        <Ionicons name= 'chevron-back' size={18} color='white'/>
      </TouchableOpacity>
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
    width: '100%',
    paddingVertical: width * 0.033,
    borderBottomWidth: 1,
    borderColor: Colors.pepsiGray.alpha1,
    marginTop: width * 0.033
  },
  submitButton: {
    width: '100%',
    alignSelf: 'center',
    height: 44,
    backgroundColor: Colors.pepsiGray.alpha1,
    borderRadius: 100,
    marginTop: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.pepsiBlack,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1
  },
  backButton: {
    width :32,
    height: 32,
    borderRadius: 100,
    backgroundColor: Colors.pepsiDarkBlue.alpha1,
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    left: width * 0.066,
    top: Constants.statusBarHeight + 8,
    shadowColor: Colors.pepsiDarkBlue.alpha1,
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 1}

  }

})