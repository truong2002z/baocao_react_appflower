import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from './firebaseConfig'; // Import Firebase configuration
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import Home from './Home/Home';
import Router from './Router';
import AddService from './Home/AddService';
import Logout from './Home/Logout';
import Service from './Home/Service';
import { UserProvider } from './context/UseContext';

const Stack = createStackNavigator();

const App = () => {
  // Function to create admin user if not exists
  const createAdminUser = async () => {
    const adminEmail = 'ngotruongvu@gmail.com'; 
    const adminRef = firebase.firestore().collection('users').doc(adminEmail);

    const admin = {
      email: adminEmail,
      password: '123123',
      role: 'admin',
      address: 'Binh Duong',
      age: '22'
    };

    const adminDoc = await adminRef.get();

    if (!adminDoc.exists) {
      try {
        // Create admin user if not exists
        await firebase.auth().createUserWithEmailAndPassword(admin.email, admin.password);
        await adminRef.set({ ...admin });
      } catch (error) {
        console.error('Error creating admin: ', error);
      }
    }
  };

  useEffect(() => {
    createAdminUser(); // Check and create admin user on app start
  }, []);

  return (
    <UserProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          {/* Your screen configurations */}
          <Stack.Screen name="Router" component={Router} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignUp" component={SignUp} />
          {/* Add more screens as needed */}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
