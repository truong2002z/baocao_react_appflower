import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDQIcgZ_ituc1oHjjy08B81K8ll4vjkrGw",

  authDomain: "demo2-7cbd7.firebaseapp.com",

  projectId: "demo2-7cbd7",

  storageBucket: "demo2-7cbd7.appspot.com",

  messagingSenderId: "303322837103",

  appId: "1:303322837103:android:cbd77b04cbded74945dd9a",

  //measurementId: "G-NBEM6VBENV"

  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };