"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { getProductById, type Product } from "@/lib/firebase/products"
import { ShoppingCart, Store } from "lucide-react"
import { useAuth } from "@/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProduct()
  }, [params.id])

  const loadProduct = async () => {
    try {
      const data = await getProductById(params.id as string)
      setProduct(data)
    } catch (error) {
      console.error("Error loading product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add products to cart",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItem = cart.find((item: any) => item.productId === product?.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        productId: product?.id,
        title: product?.title,
        price: product?.price,
        image: product?.images[0],
        quantity: 1,
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    toast({
      title: "Added to cart",
      description: `${product?.title} has been added to your cart`,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-muted rounded-2xl mb-8" />
            <div className="h-12 bg-muted rounded-xl w-3/4 mb-4" />
            <div className="h-6 bg-muted rounded-xl w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Product not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted relative">
              {product.images[selectedImage] ? (
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Store className="h-20 w-20 text-muted-foreground" />
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-balance">{product.title}</h1>
              <p className="text-muted-foreground">{product.category}</p>
            </div>

            <div className="text-4xl font-bold bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Description</h3>
              <p className="text-muted-foreground leading-relaxed text-pretty">{product.description}</p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Store className="h-4 w-4" />
              <span className="text-muted-foreground">Sold by: {product.vendorName || "MarketHub Vendor"}</span>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-muted-foreground">Stock:</span>
                <span className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-destructive"}`}>
                  {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                </span>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                size="lg"
                className="w-full rounded-xl bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] hover:opacity-90 text-white font-semibold shadow-lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
