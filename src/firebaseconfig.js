import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAN2TrJVqKObHXr71-lkdJuHvY-cIkZABA",
    authDomain: "fir-auth-626f9.firebaseapp.com",
    projectId: "fir-auth-626f9",
    storageBucket: "fir-auth-626f9.appspot.com",
    messagingSenderId: "355036096884",
    appId: "1:355036096884:web:5e4f0b8bad7fc572baa421",
    measurementId: "G-JHNVG1410M"
};

const fire = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore()
const auth = fire.auth()

export { auth, firestore }