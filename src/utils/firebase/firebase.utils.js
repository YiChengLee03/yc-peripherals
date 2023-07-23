import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

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

export const signOutUser = async () => {
  await signOut(auth);
};

// callback declared in user.context.jsx
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
