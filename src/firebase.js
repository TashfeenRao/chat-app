import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBISpu66jDd6DLuUC5dW7ByU3yrkBlsiNk",
  authDomain: "chat-app-8b4ed.firebaseapp.com",
  databaseURL: "https://chat-app-8b4ed.firebaseio.com",
  projectId: "chat-app-8b4ed",
  storageBucket: "chat-app-8b4ed.appspot.com",
  messagingSenderId: "84285058558",
  appId: "1:84285058558:web:1be51772efa04ea0c224af",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db };
