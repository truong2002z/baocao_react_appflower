import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { UserContext } from '../context/UseContext';
import { Avatar } from 'react-native-paper';
import { firebase } from '../firebaseConfig';

const Setting = ({ navigation }) => {
  const { userInfo, logoutUser } = useContext(UserContext);

  const handleInfo = () => {
    navigation.navigate('Info', { userId: userInfo ? userInfo.uid : null });
  };

  const handleEdit = () => {
    navigation.navigate('ChangeInfo');
  };

  const handleReset = () => {
    if (userInfo.email) {
      firebase
        .auth()
        .sendPasswordResetEmail(userInfo.email)
        .then(() => {
          Alert.alert('Notification', 'Request sent successfully!');
        })
        .catch((error) => {
          Alert.alert('Error', 'Account not found!');
        });
    } else {
      Alert.alert('Error', 'Account not found!');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      '',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logoutUser();
            navigation.navigate('Login');
          },
          style: 'default',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <Pressable onPress={handleInfo}>
        <View
          style={{
            flexDirection: 'row',
            padding: 20,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 10,
            marginBottom: 0,
            borderRadius: 10,
          }}
        >
          <Avatar.Image
            size={50}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
            }}
          />
          <View style={{ justifyContent: 'center', marginLeft: 10 }}>
            <Text style={{ fontSize: 16, color: '#333' }}>
              Hello: {userInfo ? userInfo.email || 'Guest' : 'Guest'}
            </Text>
          </View>
        </View>
      </Pressable>
      <View style={{ padding: 10 }}>
        <Pressable
          onPress={handleEdit}
          style={{
            backgroundColor: 'red',
            alignItems: 'center',
            padding: 15,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            Change Info
          </Text>
        </Pressable>
        <Pressable
          onPress={handleReset}
          style={{
            backgroundColor: 'red',
            alignItems: 'center',
            padding: 15,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            Reset Password
          </Text>
        </Pressable>
        <Pressable
          onPress={handleLogout}
          style={{
            backgroundColor: 'red',
            alignItems: 'center',
            padding: 15,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            Log Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 17,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#D6E5FA',
    padding: 2,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
});

export default Setting;
