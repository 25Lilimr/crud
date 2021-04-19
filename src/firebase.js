import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyBaVURCBpnIQYXDsZ4sNzbBr5UqTbaW3XE",
    authDomain: "crud-990f2.firebaseapp.com",
    projectId: "crud-990f2",
    storageBucket: "crud-990f2.appspot.com",
    messagingSenderId: "869850103053",
    appId: "1:869850103053:web:08525805d8134ae2024444"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig)
 