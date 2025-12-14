"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/providers/auth-provider"
import { getProductsByVendor, type Product } from "@/lib/firebase/products"
import { getOrdersByVendor, type Order } from "@/lib/firebase/orders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingBag, DollarSign, TrendingUp, ShoppingCart, Calendar } from "lucide-react"

export default function VendorDashboardPage() {
  const { userProfile } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    totalProfit: 0,
    productsSold: 0,
    inStock: 0,
    lowStock: 0,
  })
  const [monthlyData, setMonthlyData] = useState<{ month: string; orders: number; sales: number }[]>([])

  useEffect(() => {
    if (userProfile?.uid) {
      loadDashboardData()
    }
  }, [userProfile])

  const loadDashboardData = async () => {
    if (!userProfile?.uid) return

    try {
      // Load products and orders
      const [vendorProducts, vendorOrders] = await Promise.all([
        getProductsByVendor(userProfile.uid),
        getOrdersByVendor(userProfile.uid),
      ])

      setProducts(vendorProducts)
      setOrders(vendorOrders)

      // Calculate stats
      const totalSales = vendorOrders.reduce((sum, order) => sum + order.totalAmount, 0)
      const productsSold = vendorOrders.reduce((sum, order) => {
        return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0)
      }, 0)
      
      // Calculate profit (assuming 30% profit margin)
      const totalProfit = totalSales * 0.3

      const inStock = vendorProducts.filter((p) => p.stock > 0).length
      const lowStock = vendorProducts.filter((p) => p.stock > 0 && p.stock < 10).length

      setStats({
        totalProducts: vendorProducts.length,
        totalOrders: vendorOrders.length,
        totalSales,
        totalProfit,
        productsSold,
        inStock,
        lowStock,
      })

      // Generate monthly data for chart
      generateMonthlyData(vendorOrders)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateMonthlyData = (orders: Order[]) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const currentMonth = new Date().getMonth()
    const last6Months = []

    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12
      last6Months.push({
        month: months[monthIndex],
        orders: 0,
        sales: 0,
      })
    }

    orders.forEach((order) => {
      const orderDate = order.createdAt && typeof order.createdAt === 'object' && 'toDate' in order.createdAt
        ? order.createdAt.toDate()
        : new Date(order.createdAt)
      
      const orderMonth = orderDate.getMonth()
      const monthDiff = (currentMonth - orderMonth + 12) % 12

      if (monthDiff < 6) {
        const dataIndex = 5 - monthDiff
        if (last6Months[dataIndex]) {
          last6Months[dataIndex].orders += 1
          last6Months[dataIndex].sales += order.totalAmount
        }
      }
    })

    setMonthlyData(last6Months)
  }

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      gradient: "from-blue-400 to-cyan-300",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      gradient: "from-purple-400 to-pink-300",
    },
    {
      title: "Products Sold",
      value: stats.productsSold,
      icon: ShoppingBag,
      gradient: "from-orange-300 to-red-300",
    },
    {
      title: "Total Sales",
      value: `$${stats.totalSales.toFixed(2)}`,
      icon: DollarSign,
      gradient: "from-emerald-300 to-teal-300",
    },
    {
      title: "Total Profit (30%)",
      value: `$${stats.totalProfit.toFixed(2)}`,
      icon: TrendingUp,
      gradient: "from-green-400 to-emerald-300",
    },
    {
      title: "In Stock",
      value: stats.inStock,
      icon: Package,
      gradient: "from-indigo-300 to-purple-300",
    },
  ]

  const getMaxValue = () => {
    const maxOrders = Math.max(...monthlyData.map(d => d.orders), 1)
    const maxSales = Math.max(...monthlyData.map(d => d.sales), 1)
    return { maxOrders, maxSales }
  }

  const { maxOrders, maxSales } = getMaxValue()

  if (loading) {
    return (
      <div className="space-y-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    )
  }
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {userProfile?.displayName}!</h1>
        <p className="text-muted-foreground">Here's an overview of your store performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Monthly Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Chart */}
        <Card className="rounded-2xl border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Monthly Orders (Last 6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{data.month}</span>
                    <span className="text-muted-foreground">{data.orders} orders</span>
                  </div>
                  <div className="h-8 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-300 rounded-full transition-all duration-500"
                      style={{ width: `${(data.orders / maxOrders) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {monthlyData.every(d => d.orders === 0) && (
              <p className="text-center text-muted-foreground py-8">No orders data yet</p>
            )}
          </CardContent>
        </Card>

        {/* Sales Chart */}
        <Card className="rounded-2xl border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Monthly Sales (Last 6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{data.month}</span>
                    <span className="text-muted-foreground">${data.sales.toFixed(2)}</span>
                  </div>
                  <div className="h-8 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full transition-all duration-500"
                      style={{ width: `${(data.sales / maxSales) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {monthlyData.every(d => d.sales === 0) && (
              <p className="text-center text-muted-foreground py-8">No sales data yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Products */}
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
                  <div className="flex items-center gap-4">
                    {product.images && product.images[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold">{product.title}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
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
