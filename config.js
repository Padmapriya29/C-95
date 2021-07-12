import firebase from "firebase";
require("@firebase/firestore");
var firebaseConfig = {
apiKey: "AIzaSyBIPMb-Dy0NrWy_RkTJJtvHHEh6zvNGEn0",
authDomain: "my-app-1-s-1-m.firebaseapp.com",
projectId: "my-app-1-s-1-m",
storageBucket: "my-app-1-s-1-m.appspot.com",
messagingSenderId: "105542872020",
appId: "1:105542872020:web:692a8fe46f0d91867e0441"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();