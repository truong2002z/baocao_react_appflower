import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
  // AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

// import {AuthContext} from './context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('window');

const Login = ({navigation}) => {
  const [data, setData] = React.useState({
    username: 'toi@gmail.com',
    password: '1234567',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const isEmail = value => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!regex.test(String(value).toLowerCase());
  };
  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: isEmail(val),
        isValidUser: isEmail(val),
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: isEmail(val),
        isValidUser: isEmail(val),
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: isEmail(val),
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const loginHandle = async () => {
    // navigation.navigate('SignUpScreen')
    const {username, password} = data;
    if (data.username.length === 0 || data.password.length === 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    } else {
      await auth()
        .signInWithEmailAndPassword(username, password)
        .then(async function (result) {
          // Alert.alert('Thông báo!', 'Đăng nhập thành công', [{text: 'Okay'}]);
          let body = {
            username: username,
            password: password,
          };
          await AsyncStorage.setItem('@Account', JSON.stringify(body));

          navigation.navigate('Home');
          // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
        })
        .catch(function (error) {
          if (error.code === 'auth/invalid-email') {
            Alert.alert('Thất bại!', 'Email bạn nhập không hợp lệ!', [
              {text: 'Okay'},
            ]);
          } else {
            if (error.code === 'auth/wrong-password') {
              Alert.alert(
                'Thông báo!',
                'Thông tin email hoặc password không chính xác!',
                [{text: 'Okay'}],
              );
            } else {
              Alert.alert(
                'Thông báo!',
                'Đăng nhập thất bại! Vui lòng thử lại!',
                [{text: 'Okay'}],
              );
            }
          }
          console.log(error);
        });
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFF', height: '100%', flex: 1}}>
      <Image
        source={require('../../images/nameLogin.png')}
        style={{
          width: 163,
          height: 119,
          alignSelf: 'center',
          marginTop: 50,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 55,
          // marginRight: 20,
          borderWidth: 2,
          marginTop: 50,
          paddingHorizontal: 10,
          borderColor: '#00a46c',
          borderRadius: 23,
          paddingVertical: 2,
        }}>
        <Icon name="mail" color="#00a46c" size={24} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#00a46c"
          style={{paddingHorizontal: 10, marginRight: 10, width: width / 2.2}}
          autoCapitalize="none"
          onChangeText={val => textInputChange(val)}
          onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          defaultValue={data.username}
        />
        {data.check_textInputChange ? (
          <Animatable.View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </Animatable.View>
        ) : null}
      </View>
      {data.isValidUser ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Vui lòng nhập email hợp lệ</Text>
        </Animatable.View>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 55,
          borderWidth: 2,
          marginTop: 15,
          paddingHorizontal: 10,
          borderColor: '#00a46c',
          borderRadius: 23,
          paddingVertical: 2,
        }}>
        <Icon name="md-lock-closed" color="#00a46c" size={28} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#00a46c"
          style={{paddingHorizontal: 10, marginRight: 10, width: width / 2.2}}
          secureTextEntry={data.secureTextEntry ? true : false}
          autoCapitalize="none"
          onChangeText={val => handlePasswordChange(val)}
          defaultValue={data.password}
        />
        <TouchableOpacity
          onPress={updateSecureTextEntry}
          style={{justifyContent: 'flex-end'}}>
          {data.secureTextEntry ? (
            <Feather name="eye-off" color="green" size={22} />
          ) : (
            <Feather name="eye" color="green" size={22} />
          )}
        </TouchableOpacity>
      </View>
      {data.isValidPassword ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Mật khẩu phải có ít nhất 6 ký tự.</Text>
        </Animatable.View>
      )}
      <TouchableOpacity
        onPress={() => {
          loginHandle(data.username, data.password);
        }}
        style={{
          marginHorizontal: 55,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
          backgroundColor: '#00a46c',
          paddingVertical: 16,
          borderRadius: 23,
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'SemiBold',
            fontSize: 20,
          }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text
          style={{
            alignSelf: 'center',
            color: '#00a46c',
            fontFamily: 'SemiBold',
            paddingVertical: 25,
            fontSize: 18,
          }}>
          Register
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Login;
