import React, { useContext } from 'react';
import { View, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { UserContext } from '../context/UseContext';
import { firebase } from '../firebaseConfig';

const Logout = ({ navigation }) => {
  const { logoutUser } = useContext(UserContext);

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
            firebase
              .auth()
              .signOut()
              .then(() => {
                logoutUser();
                navigation.navigate('Login');
              })
              .catch((error) => {
                console.error('Error signing out: ', error);
              });
          },
          style: 'default',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleLogout}>
        <Text style={{ color: '#333', fontSize: 15, fontWeight: 'bold' }}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Logout;
