"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/providers/auth-provider"
import { getProductsByVendor, deleteProduct, type Product } from "@/lib/firebase/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function VendorProductsPage() {
  const { userProfile } = useAuth()
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userProfile?.uid) {
      loadProducts()
    }
  }, [userProfile])

  const loadProducts = async () => {
    if (!userProfile?.uid) return
    try {
      const data = await getProductsByVendor(userProfile.uid)
      setProducts(data)
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId)
      toast({
        title: "Product deleted",
        description: "The product has been removed successfully",
      })
      loadProducts()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Products</h1>
          <p className="text-muted-foreground">Manage your product listings</p>
        </div>
        <Button asChild className="rounded-xl bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] hover:opacity-90">
          <Link href="/vendor/products/new">
            <Plus className="mr-2 h-5 w-5" />
            Add Product
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <Card className="rounded-2xl border-border">
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground mb-4">You haven't added any products yet</p>
            <Button asChild className="rounded-xl bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] hover:opacity-90">
              <Link href="/vendor/products/new">
                <Plus className="mr-2 h-5 w-5" />
                Add Your First Product
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="rounded-2xl border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.category}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1 rounded-xl bg-transparent">
                    <Link href={`/vendor/products/edit/${product.id}`}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon" className="rounded-xl">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the product.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(product.id!)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
