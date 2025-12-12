"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { VendorSidebar } from "@/components/vendor-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const { userProfile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!userProfile || userProfile.role !== "vendor")) {
      router.push("/")
    }
  }, [userProfile, loading, router])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!userProfile || userProfile.role !== "vendor") {
    return null
  }

  return (
    <div className="h-screen flex">
      <aside className="w-64 hidden md:block">
        <VendorSidebar />
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-2xl font-bold">Vendor Dashboard</h2>
            <ThemeToggle />
          </div>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
