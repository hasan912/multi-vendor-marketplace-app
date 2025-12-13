"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/providers/auth-provider"
import { getProductsByVendor, type Product } from "@/lib/firebase/products"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingBag, DollarSign, TrendingUp } from "lucide-react"

export default function VendorDashboardPage() {
  const { userProfile } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    inStock: 0,
    lowStock: 0,
  })

  useEffect(() => {
    if (userProfile?.uid) {
      loadDashboardData()
    }
  }, [userProfile])

  const loadDashboardData = async () => {
    if (!userProfile?.uid) return

    const vendorProducts = await getProductsByVendor(userProfile.uid)
    setProducts(vendorProducts)

    const totalValue = vendorProducts.reduce((sum, p) => sum + p.price * p.stock, 0)
    const inStock = vendorProducts.filter((p) => p.stock > 0).length
    const lowStock = vendorProducts.filter((p) => p.stock > 0 && p.stock < 10).length

    setStats({
      totalProducts: vendorProducts.length,
      totalValue,
      inStock,
      lowStock,
    })
  }

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      gradient: "from-blue-400 to-cyan-300",
    },
    {
      title: "In Stock",
      value: stats.inStock,
      icon: TrendingUp,
      gradient: "from-rose-300 to-pink-300",
    },
    {
      title: "Low Stock",
      value: stats.lowStock,
      icon: ShoppingBag,
      gradient: "from-orange-300 to-red-300",
    },
    {
      title: "Total Inventory Value",
      value: `$${stats.totalValue.toFixed(2)}`,
      icon: DollarSign,
      gradient: "from-emerald-300 to-teal-300",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {userProfile?.displayName}!</h1>
        <p className="text-muted-foreground">Here's an overview of your store</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="rounded-2xl border-border hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div
                className={`h-12 w-12 rounded-xl bg-linear-to-br ${stat.gradient} flex items-center justify-center shadow-md`}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl border-border">
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No products yet. Start by adding your first product!
            </p>
          ) : (
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-accent/50 transition-colors"
                >
                  <div>
                    <h4 className="font-semibold">{product.title}</h4>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${product.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
