import * as firebase from "firebase";

require("@firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrEMChloGyflb5rAd8GWuuVMB-3fx1Nco",
  authDomain: "messengerapp-9514f.firebaseapp.com",
  projectId: "messengerapp-9514f",
  storageBucket: "messengerapp-9514f.appspot.com",
  messagingSenderId: "879241311409",
  appId: "1:879241311409:web:e37f26a0fd6d620900de90"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
export default firebase.firestore();
