"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, ShoppingBag, Plus, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/firebase/auth"
import { useRouter } from "next/navigation"

export function VendorSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const links = [
    {
      href: "/vendor/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/vendor/products",
      label: "My Products",
      icon: Package,
    },
    {
      href: "/vendor/products/new",
      label: "Add Product",
      icon: Plus,
    },
    {
      href: "/vendor/orders",
      label: "Orders",
      icon: ShoppingBag,
    },
  ]

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/vendor/dashboard" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#A1C4FD] to-[#C2E9FB] text-white font-bold text-xl shadow-lg">
            V
          </div>
          <span className="text-lg font-bold">Vendor Portal</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
