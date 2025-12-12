import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "./config"

export type UserRole = "customer" | "vendor"

export interface UserProfile {
  uid: string
  email: string
  role: UserRole
  displayName?: string
  createdAt: Date
}

export async function signUp(email: string, password: string, role: UserRole, displayName?: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  // Create user profile in Firestore
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email!,
    role,
    displayName,
    createdAt: new Date(),
  }

  await setDoc(doc(db, "users", user.uid), userProfile)

  // Create vendor profile if vendor
  if (role === "vendor") {
    await setDoc(doc(db, "vendor_profiles", user.uid), {
      vendorId: user.uid,
      businessName: displayName || "My Store",
      description: "",
      createdAt: new Date(),
    })
  }

  return userProfile
}

export async function signIn(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))
  return userDoc.data() as UserProfile
}

export async function signOut() {
  await firebaseSignOut(auth)
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userDoc = await getDoc(doc(db, "users", uid))
  if (userDoc.exists()) {
    return userDoc.data() as UserProfile
  }
  return null
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}
