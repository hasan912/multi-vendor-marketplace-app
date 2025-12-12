"use client"

import { useState } from "react"
import { useAuth } from "@/providers/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VendorOrdersPage() {
  const { userProfile } = useAuth()
  const [orders, setOrders] = useState([])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Orders</h1>
        <p className="text-muted-foreground">Manage your product orders</p>
      </div>

      <Card className="rounded-2xl border-border">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No orders yet. Orders will appear here when customers purchase your products.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
