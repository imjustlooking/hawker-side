import firebase from 'firebase'
// var config = {
//    apiKey: "AIzaSyAyXEaQfr8GQ2wVc6xc5TTkiKw7qBJVfHk",
//    authDomain: "hawker-51e69.firebaseapp.com",
//    databaseURL: "https://hawker-51e69.firebaseio.com",
//    projectId: "hawker-51e69",
//    storageBucket: "hawker-51e69.appspot.com",
//    messagingSenderId: "609926828771"
//  }
 var config = {
    apiKey: "AIzaSyBC0mdClPhZwm7QZRmvXTCFEUCEJ4VOjDw",
    authDomain: "hotsia-73236.firebaseapp.com",
    databaseURL: "https://hotsia-73236.firebaseio.com",
    projectId: "hotsia-73236",
    storageBucket: "hotsia-73236.appspot.com",
    messagingSenderId: "825371416587"
  };
firebase.initializeApp(config)
// authentication adding
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
// authentication fin
export default firebase
