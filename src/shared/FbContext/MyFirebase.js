// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged , createUserWithEmailAndPassword} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
import app from 'firebase/app';

const firebaseConfig = {

  apiKey: "AIzaSyCe9g-gXYWlOSJkRTagK1O99JnQsHNvP2I",

  authDomain: "sflivingwagecoalition.firebaseapp.com",

  projectId: "sflivingwagecoalition",

  storageBucket: "sflivingwagecoalition.appspot.com",

  messagingSenderId: "281571076871",

  appId: "1:281571076871:web:b3d4693c38969d01b5f3a2"

};


// const devConfig = {
//   apiKey: process.env.REACT_APP_DEV_API_KEY,
//   authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
//   projectId: process.env.REACT_APP_DEV_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
// };

// const config =
//   process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class MyFirebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

   doCheckAuth = () => {
      const auth = getAuth();
      const isAuth = false;
      onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            // setUserEmail(user.email);
            
            //setAuthenticated(true);
              isAuth = true;
          } else {
            // User is signed out
            // ...
             isAuth = false;
          }
        });
     
        return isAuth;
  }
}


export default MyFirebase;