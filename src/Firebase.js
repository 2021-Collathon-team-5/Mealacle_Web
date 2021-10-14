import firebase from "firebase/app";
import firebaseAuth from "firebase/auth";
import firebaseFirestore from "firebase/firestore";
import firebaseFirestorage from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAb7lN1-2LlN6REnbqAY3sFdnCx4Dlu1V0",
  authDomain: "mealacle-7cb03.firebaseapp.com",
  projectId: "mealacle-7cb03",
  storageBucket: "mealacle-7cb03.appspot.com",
  messagingSenderId: "246032385864",
  appId: "1:246032385864:web:79dada71f0f18019aed57d",
  measurementId: "G-32EYNPT8HK",
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebaseAuth;
export const firestoreService = firebaseFirestore.getFirestore;
export const storageService = firebaseFirestorage;
