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
import { db } from "./config"

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

// Compress and resize image before converting to base64
export async function compressImage(file: File, maxWidth = 800, maxHeight = 800, quality = 0.7): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }

        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Could not compress image'))
              return
            }
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            })
            resolve(compressedFile)
          },
          'image/jpeg',
          quality
        )
      }
      img.onerror = () => reject(new Error('Could not load image'))
    }
    reader.onerror = () => reject(new Error('Could not read file'))
  })
}

export async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

export async function uploadProductImage(file: File, productId: string): Promise<string> {
  try {
    // Compress image first to reduce size
    const compressedFile = await compressImage(file, 800, 800, 0.7)
    
    // Convert compressed image to base64
    const base64String = await convertImageToBase64(compressedFile)
    
    // Check if base64 is too large (warn if > 500KB)
    const sizeInKB = Math.round((base64String.length * 3) / 4 / 1024)
    if (sizeInKB > 500) {
      console.warn(`Image size is ${sizeInKB}KB - may cause performance issues`)
    }
    
    return base64String
  } catch (error) {
    console.error('Error processing image:', error)
    throw new Error('Failed to process image')
  }
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
