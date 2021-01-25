import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAqwb3ZXWi9HSYgnOeUtI5lpK97p_QfQL8',
  authDomain: 'crwn-db-8b780.firebaseapp.com',
  databaseURL: 'https://crwn-db-8b780.firebaseio.com',
  projectId: 'crwn-db-8b780',
  storageBucket: 'crwn-db-8b780.appspot.com',
  messagingSenderId: '839433946732',
  appId: '1:839433946732:web:474b29a5aa9f319f84fa49',
  measurementId: 'G-CY3LTF3DQQ',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
