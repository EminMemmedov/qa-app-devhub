import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFAoHsh7rQ32qvIUqdyRaIZkGRjKI2t8M",
  authDomain: "qa-student-app-12f98.firebaseapp.com",
  projectId: "qa-student-app-12f98",
  storageBucket: "qa-student-app-12f98.firebasestorage.app",
  messagingSenderId: "1054149573722",
  appId: "1:1054149573722:web:1603918839bc3ce34bac63",
  measurementId: "G-DXPHJRLDTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

