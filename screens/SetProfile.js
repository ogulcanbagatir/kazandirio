import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View , Text, TouchableOpacity, TextInput, Keyboard, ScrollView, KeyboardAvoidingView} from 'react-native';
import Colors from '../utils/Colors';
import { width } from '../utils/Constants'
import fontStyles from '../utils/FontStyles';
import Constants  from 'expo-constants';
import BackButton from '../components/BackButton';
import API from '../utils/API'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {UserContext} from '../utils/Context'


const inputTypes = [
  'Ad',
  'Soyad',
  'Doğum Tarihi',
  'E-mail'
]

export default function SetProfile(props){
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [birthDate, setBirthDate] = useState('gg/aa/yy')
  const [email, setEmail] = useState('')
  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date('January 1, 2000'))
  const {user, setUser} = useContext(UserContext)

  const submit = () => {
    let user = {
      firstName: name,
      lastName: surname,
      birthDate: moment(birthDate).format('YYYY-MM-DD'),
      email: email
    }

    API.setProfile(user).then((res)=>{
      setUser(res)
      props.navigation.navigate('Home')
      console.log(res)
    })  
  }

  const onChangeText = (text,index) => {
    if(index === 0){
      setName(text)
    }else if(index === 1){
      setSurname(text)
    }else if(index === 2){
      setBirthDate(text)
    }else{
      setEmail(text)
    }
  }

  const disabled = () => {
    console.log('aaa')
    if(name.length >= 2 && surname.length >= 2 && typeof birthDate == 'object' && email.length > 0){
      return false
    }
    return true
  }

  const onChangeBirthDate = ( event, date ) => {
    setDate(date)
    setBirthDate(date)
    console.log(date)
  }

  return(
    <View style={styles.container} >
      <View style={{flex: 1}} onTouchStart={()=>setShow(false)}>
        <KeyboardAvoidingView keyboardVerticalOffset={16} style={{flex: 1, backgroundColor: 'transparent'}}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{paddingTop: Constants.statusBarHeight + 32, paddingHorizontal: width * 0.066}}
          >
            <Text style={[fontStyles.title3, {color: Colors.pepsiBlack.alpha1, fontWeight: '400', alignSelf: 'center'}]}>
              {'Üye Ol'}
            </Text>
            <Text style={[fontStyles.body, {color: Colors.pepsiBlack.alpha1, fontWeight: '400', alignSelf: 'center', textAlign: 'center',marginTop: width * 0.05, lineHeight: 28}]}>
              {'Kazandırio fırsatlarından yararlanmaya başlamak için hemen üye ol!'}
            </Text>
            <View style={{width :'100%', marginTop: width * 0.05}}>
              {
                inputTypes.map((item, index)=>{
                  return (
                    <View key={index + 'xx'} style={{width: '100%', marginTop: width * 0.05}}>
                      <Text style={[fontStyles.subhead, {color: Colors.pepsiGray.alpha1}]}>
                        {item + '*'}
                      </Text>
                      {
                        index === 2 ? 
                        <TouchableOpacity style={styles.input} activeOpacity={0.9} onPress={()=>setShow(show => !show)}>
                          <Text style={[fontStyles.subhead, {color: Colors.pepsiGray.alpha1}]}>
                            {typeof birthDate === 'string' ? birthDate : moment(birthDate).format('DD.MM.YYYY')}
                          </Text>
                        </TouchableOpacity>
                        :
                        <TextInput 
                          style={styles.input}
                          onChangeText={(text)=> onChangeText(text,index)}
                          autoCapitalize='none'
                          autoComplete='off'
                          autoCorrect={false}
                        
                        />
                      }
                      
                    </View>
                  )
                })
              } 
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <TouchableOpacity disabled={disabled()} style={[styles.loginButton, {backgroundColor: !disabled() ? Colors.pepsiDarkBlue.alpha1 : Colors.pepsiGray.alpha1}]} onPress={submit}>
        <Text style={[fontStyles.body, {color: 'white'}]}>
          Bilgilerini Onayla
        </Text>
      </TouchableOpacity>
      
      <BackButton navigation={props.navigation} onPress={()=>props.navigation.navigate('PhoneLogin')}/>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display='spinner'
          onChange={onChangeBirthDate}
          style={{backgroundColor: 'white'}}
        />
      )}
    </View>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: width * 0.05,
    marginTop: width * 0.033,
    height: 48,
    borderColor: Colors.pepsiBlack.alpha08,
    justifyContent: 'center',
  },
  loginButton: {
    height: 44,
    width: width * 0.868,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: width * 0.1,
    shadowColor: Colors.pepsiBlack.alpha1,
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 32
  }
})