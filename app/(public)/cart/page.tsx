"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/providers/auth-provider"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CartItem {
  productId: string
  title: string
  price: number
  image: string
  quantity: number
}

export default function CartPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(cart)
  }

  const updateQuantity = (productId: string, change: number) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: Math.max(1, item.quantity + change) }
        }
        return item
      })
      .filter((item) => item.quantity > 0)

    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const removeItem = (productId: string) => {
    const updatedCart = cartItems.filter((item) => item.productId !== productId)
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    if (!user) {
      router.push("/login")
      return
    }
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] bg-clip-text text-transparent">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <Card className="rounded-2xl border-border">
            <CardContent className="py-16 text-center">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Add some products to get started</p>
              <Button asChild className="rounded-xl bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] hover:opacity-90">
                <Link href="/products">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.productId} className="rounded-2xl border-border">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0 relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-2xl font-bold bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] bg-clip-text text-transparent">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.productId)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.productId, -1)}
                            className="h-8 w-8 rounded-lg"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.productId, 1)}
                            className="h-8 w-8 rounded-lg"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="rounded-2xl border-border sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-xl font-bold">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold">Free</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between text-lg">
                        <span className="font-bold">Total</span>
                        <span className="font-bold bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] bg-clip-text text-transparent">
                          ${getTotalPrice().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full rounded-xl bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] hover:opacity-90 text-white font-semibold"
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
