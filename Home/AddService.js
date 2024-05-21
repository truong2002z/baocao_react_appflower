import React, { useState } from 'react';
import { View, StyleSheet, Alert, Pressable, Text, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { firebase } from '../firebaseConfig';
import { launchImageLibrary } from 'react-native-image-picker';

const AddService = ({ navigation }) => {
  const [service, setService] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const addService = async () => {
    try {
      if (!service || !price) {
        Alert.alert('', 'Please fill in all required fields.');
        return;
      }

      const priceValue = parseFloat(price);
      if (isNaN(priceValue)) {
        Alert.alert('', 'Invalid number');
        return;
      }

      let imageUrl = null;
      if (imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const storageRef = firebase.storage().ref(`Images/${service}-${Date.now()}`);
        await storageRef.put(blob);
        imageUrl = await storageRef.getDownloadURL();
      }

      await firebase.firestore().collection('services').add({
        serviceName: service,
        price: priceValue,
        imageUrl,
      });

      navigation.navigate('Home');
      setService('');
      setPrice('');
      setImageUri(null);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  return (
    <View style={{ justifyContent: 'center', margin: 10, borderRadius: 20 }}>
      <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Service name *</Text>
      <TextInput
        style={{ margin: 10, borderRadius: 10 }}
        label="Input service name"
        value={service}
        onChangeText={(service) => setService(service)}
      />
      <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Price *</Text>
      <TextInput
        style={{ margin: 10, borderRadius: 10 }}
        label="input price service"
        value={price}
        onChangeText={(price) => setPrice(price)}
      />
      <Pressable onPress={pickImage} style={{ alignItems: 'center', margin: 10 }}>
        <Text style={{ color: 'blue' }}>Select Image</Text>
      </Pressable>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 400, height: 200, borderRadius: 10, margin: 10 }}
        />
      )}

      <View style={{ justifyContent: 'center', padding: 10 }}>
        <Pressable
          onPress={addService}
          style={{
            backgroundColor: 'red',
            alignItems: 'center',
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddService;
