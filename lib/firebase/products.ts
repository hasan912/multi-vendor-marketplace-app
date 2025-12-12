import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  type Timestamp,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "./config"

export interface Product {
  id?: string
  title: string
  price: number
  description: string
  images: string[]
  vendorId: string
  vendorName?: string
  stock: number
  category: string
  createdAt: Date | Timestamp
}

export async function createProduct(productData: Omit<Product, "id" | "createdAt">) {
  const docRef = await addDoc(collection(db, "products"), {
    ...productData,
    createdAt: new Date(),
  })
  return docRef.id
}

export async function updateProduct(productId: string, productData: Partial<Product>) {
  const productRef = doc(db, "products", productId)
  await updateDoc(productRef, productData)
}

export async function deleteProduct(productId: string) {
  const productRef = doc(db, "products", productId)
  await deleteDoc(productRef)
}

export async function getProducts(): Promise<Product[]> {
  const productsQuery = query(collection(db, "products"), orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(productsQuery)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[]
}

export async function getProductsByVendor(vendorId: string): Promise<Product[]> {
  const productsQuery = query(collection(db, "products"), where("vendorId", "==", vendorId))
  const querySnapshot = await getDocs(productsQuery)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[]
}

export async function getProductById(productId: string): Promise<Product | null> {
  const productDoc = await getDoc(doc(db, "products", productId))
  if (productDoc.exists()) {
    return {
      id: productDoc.id,
      ...productDoc.data(),
    } as Product
  }
  return null
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const productsQuery = query(collection(db, "products"), where("category", "==", category))
  const querySnapshot = await getDocs(productsQuery)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[]
}

export async function uploadProductImage(file: File, productId: string): Promise<string> {
  const storageRef = ref(storage, `products/${productId}/${Date.now()}_${file.name}`)
  await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(storageRef)
  return downloadURL
}

export const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports & Outdoors",
  "Books",
  "Toys & Games",
  "Health & Beauty",
  "Food & Beverage",
]
