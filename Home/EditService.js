import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, Image, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { firebase } from '../firebaseConfig';
import { launchImageLibrary } from 'react-native-image-picker';

const EditService = ({ route, navigation }) => {
  const { id } = route.params;
  const [service, setService] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const serviceDoc = await firebase.firestore().collection('services').doc(id).get();
        if (serviceDoc.exists) {
          const serviceData = serviceDoc.data();
          setService(serviceData.serviceName);
          setPrice(serviceData.price.toString());
          setImageUri(serviceData.imageUrl);
        }
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };
    fetchServiceDetails();
  }, [id]);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleUpdate = async () => {
    try {
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

      await firebase.firestore().collection('services').doc(id).update({
        serviceName: service,
        price: priceValue,
        imageUrl,
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  return (
    <View style={{ justifyContent: 'center', margin: 10, borderRadius: 20 }}>
      <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Service name *</Text>
      <TextInput
        style={{ margin: 10, borderRadius: 10 }}
        label="Input service name"
        value={service}
        underlineColor='transparent'
        onChangeText={(service) => setService(service)}
      />
      <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Price *</Text>
      <TextInput
        style={{ margin: 10, borderRadius: 10 }}
        label="input price service"
        value={price}
        underlineColor='transparent'
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
          onPress={handleUpdate}
          style={{
            backgroundColor: 'red',
            alignItems: 'center',
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Update</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EditService;
