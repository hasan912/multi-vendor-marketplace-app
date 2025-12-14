import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
apiKey: "AIzaSyDYhLebpzXNjOEj0wZjPDEIucXP1jtd2k4",
  authDomain: "multi-vendor-marketplace-2f575.firebaseapp.com",
  projectId: "multi-vendor-marketplace-2f575",
  storageBucket: "multi-vendor-marketplace-2f575.firebasestorage.app",
  messagingSenderId: "43434329630",
  appId: "1:43434329630:web:7f1d8811c465e008a1500f",
  measurementId: "G-0BM959JKKN"}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
