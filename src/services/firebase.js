
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB5Q-dLfgINP3xZLSEZJaxPTfp6Un6taDY",
    authDomain: "todo-30f38.firebaseapp.com",
    projectId: "todo-30f38",
    storageBucket: "todo-30f38.appspot.com",
    messagingSenderId: "1007609742755",
    appId: "1:1007609742755:web:35fcfb47784539b65ac616"
  };
  
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;