import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBfoNhWhQITXYTUl1rNo1DajAIsjTNotv8',
  authDomain: 'yc-peripherals-db.firebaseapp.com',
  projectId: 'yc-peripherals-db',
  storageBucket: 'yc-peripherals-db.appspot.com',
  messagingSenderId: '426414983577',
  appId: '1:426414983577:web:aebd44547957154819eb08',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Instantiate a new instance of google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Initialize an Auth instance
export const auth = getAuth();

// Sign in method with google (can be done for other methods by passing in a different provider)
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Initialize Firestore
export const db = getFirestore();

// Create new user data in Firestore Database from Auth
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid); // get doc reference
  const userSnapshot = await getDoc(userDocRef); // get snapshot containing uer data

  // If user does not exist, create a new account
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation, // overwriting displayName for email log-in without a preset username tied to the account
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
};

// Create new user data in Firestore Database with Email
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
