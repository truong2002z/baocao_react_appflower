import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Alert } from 'react-native';
import { firebase } from '../firebaseConfig';
import { UserContext } from '../context/UseContext';

const Info = ({ route, navigation }) => {
  const [userDetails, setUserDetails] = useState(null);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDocument = await firebase
          .firestore()
          .collection('users')
          .doc(userInfo.email) // or userInfo.uid based on your document structure
          .get();

        if (userDocument.exists) {
          setUserDetails(userDocument.data());
        } else {
          // Handle the scenario when the user document does not exist
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle the error
        Alert.alert('Error', 'An error occurred while fetching user details.');
      }
    };

    fetchUserDetails();
  }, [userInfo]);

  return (
    <View style={{ padding: 10 }}>
      {userDetails && (
        <View>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black' }}>
            Email: {userDetails.email}
          </Text>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black' }}>
            Address: {userDetails.address}
          </Text>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black' }}>
            Age: {userDetails.age}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Info;
