import { collection, addDoc, getDocs, query, where, orderBy, updateDoc, doc, type Timestamp } from "firebase/firestore"
import { db } from "./config"

export type OrderStatus = "pending" | "shipped" | "completed" | "cancelled"

export interface OrderItem {
  productId: string
  title: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id?: string
  userId: string
  vendorId: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  createdAt: Date | Timestamp
  shippingAddress?: {
    fullName: string
    address: string
    city: string
    state: string
    zipCode: string
  }
}

export async function createOrder(orderData: Omit<Order, "id" | "createdAt">) {
  // Remove undefined fields
  const cleanOrderData: any = {
    userId: orderData.userId,
    vendorId: orderData.vendorId,
    items: orderData.items,
    totalAmount: orderData.totalAmount,
    status: orderData.status,
    createdAt: new Date(),
  }

  // Only add shippingAddress if it exists and has values
  if (orderData.shippingAddress) {
    cleanOrderData.shippingAddress = {
      fullName: orderData.shippingAddress.fullName || "",
      address: orderData.shippingAddress.address || "",
      city: orderData.shippingAddress.city || "",
      state: orderData.shippingAddress.state || "",
      zipCode: orderData.shippingAddress.zipCode || "",
    }
  }

  const docRef = await addDoc(collection(db, "orders"), cleanOrderData)
  return docRef.id
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const ordersQuery = query(collection(db, "orders"), where("userId", "==", userId), orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(ordersQuery)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[]
}

export async function getOrdersByVendor(vendorId: string): Promise<Order[]> {
  const ordersQuery = query(collection(db, "orders"), where("vendorId", "==", vendorId), orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(ordersQuery)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[]
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const orderRef = doc(db, "orders", orderId)
  await updateDoc(orderRef, { status })
}
