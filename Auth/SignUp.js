import React, { useState } from 'react';
import { View, StyleSheet, Alert, Pressable, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { firebase } from '../firebaseConfig';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    if (password === passwordRepeat) {
      try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await firebase.firestore().collection('users').doc(user.email).set({
          email: user.email,
          age: '25',
          address: 'binhduong',
          role: 'user'
        });

        navigation.navigate('Login');
        Alert.alert('Success', 'Successfully signed up!');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert('Error', 'Passwords do not match');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={!showPassword}
        right={<TextInput.Icon name={showPassword ? 'eye-off' : 'eye'} onPress={toggleShowPassword} />}
      />
      <TextInput
        style={styles.textInput}
        label="Password repeat"
        value={passwordRepeat}
        onChangeText={(text) => setPasswordRepeat(text)}
        secureTextEntry={!showPassword}
        right={<TextInput.Icon name={showPassword ? 'eye-off' : 'eye'} onPress={toggleShowPassword} />}
      />
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SignUp</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>SignIn</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
    borderRadius: 20,
  },
  textInput: {
    width: 350,
    marginBottom: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUp;
