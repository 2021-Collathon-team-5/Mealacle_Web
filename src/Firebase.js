import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAb7lN1-2LlN6REnbqAY3sFdnCx4Dlu1V0",
  authDomain: "mealacle-7cb03.firebaseapp.com",
  projectId: "mealacle-7cb03",
  storageBucket: "mealacle-7cb03.appspot.com",
  messagingSenderId: "246032385864",
  appId: "1:246032385864:web:79dada71f0f18019aed57d",
  measurementId: "G-32EYNPT8HK",
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);
export const firestoreService = getFirestore(app);
