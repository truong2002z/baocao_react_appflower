import { createContext, useState, useEffect } from 'react';
import { firebase } from '../firebaseConfig';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ email: '' });
  const [errMessage, setErrMessage] = useState(null);
  const db = firebase.firestore();
  const usersCollection = db.collection('users');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        usersCollection.doc(user.uid).onSnapshot((snapshot) => {
          if (snapshot.exists) {
            const res = snapshot.data();
            setUserInfo(res);
            setErrMessage(null);
          } else {
            setErrMessage('User not found');
          }
        });
      } else {
        // User is signed out.
        setUserInfo({});
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setErrMessage(error.message);
    }
  };

  const logoutUser = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      setErrMessage(error.message);
    }
  };

  const updateUserInformation = async (newInfo) => {
    try {
      await usersCollection.doc(userInfo.uid).update(newInfo);
      console.log('User information updated successfully!');
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  let contextData = {
    setUserInfo,
    errMessage,
    userInfo,
    loginUser,
    logoutUser,
    updateUserInformation,
  };

  return (
    <UserContext.Provider value={{ ...contextData }}>{children}</UserContext.Provider>
  );
};
