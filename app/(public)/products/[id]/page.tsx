"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { getProductById, type Product } from "@/lib/firebase/products"
import { ShoppingCart, Store, BadgeCheck, Share2, Heart } from "lucide-react"
import { useAuth } from "@/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { motion } from "framer-motion"

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
        vendorId: product?.vendorId,
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
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-96 bg-muted rounded-3xl" />
            <div className="space-y-4">
              <div className="h-12 bg-muted rounded-xl w-3/4" />
              <div className="h-6 bg-muted rounded-xl w-1/4" />
              <div className="h-24 bg-muted rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => router.push("/products")}>Browse Products</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-muted/30 relative border border-border/50 shadow-sm group">
              {product.images[selectedImage] ? (
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Store className="h-24 w-24 text-muted-foreground/30" />
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedImage === index ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"
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
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                  {product.category}
                </span>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Share2 className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Heart className="w-5 h-5" />
                    </Button>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">{product.title}</h1>
              
              <div className="flex items-end gap-4">
                <div className="text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </div>
                {product.stock > 0 && (
                  <div className="flex items-center text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full text-sm font-semibold mb-1">
                    <BadgeCheck className="w-4 h-4 mr-1" /> In Stock
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/50 shadow-sm">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <Store className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                     <p className="text-sm text-muted-foreground">Sold by</p>
                     <p className="font-semibold">{product.vendorName || "Verified Vendor"}</p>
                </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-xl">Description</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
            </div>

            <div className="pt-6 border-t border-border">
              <div className="flex flex-col gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  size="lg"
                  className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShoppingCart className="mr-2 h-6 w-6" />
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                    Free shipping on orders over $50 • 30-day return policy
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
