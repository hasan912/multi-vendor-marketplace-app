"use client"

import Link from "next/link"
import { useAuth } from "@/providers/auth-provider"
import { signOut } from "@/lib/firebase/auth"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ShoppingCart, Store, User, LogOut, Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const { user, userProfile } = useAuth()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#A1C4FD] to-[#C2E9FB] text-white font-bold text-xl shadow-lg">
              M
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] bg-clip-text text-transparent">
              MarketHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              Categories
            </Link>
            {userProfile?.role === "vendor" && (
              <Link
                href="/vendor/dashboard"
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
              >
                <Store className="h-4 w-4" />
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <>
                <Button variant="ghost" size="icon" asChild className="relative">
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="cursor-pointer">
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    {userProfile?.role === "vendor" && (
                      <DropdownMenuItem asChild>
                        <Link href="/vendor/dashboard" className="cursor-pointer">
                          Vendor Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] hover:opacity-90">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  <Link href="/products" onClick={() => setMobileOpen(false)} className="text-lg font-medium">
                    Products
                  </Link>
                  <Link href="/categories" onClick={() => setMobileOpen(false)} className="text-lg font-medium">
                    Categories
                  </Link>
                  {userProfile?.role === "vendor" && (
                    <Link
                      href="/vendor/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-medium flex items-center gap-2"
                    >
                      <Store className="h-5 w-5" />
                      Dashboard
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
