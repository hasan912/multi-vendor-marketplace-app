"use client"

import Link from "next/link"
import { useAuth } from "@/providers/auth-provider"
import { signOut } from "@/lib/firebase/auth"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ShoppingCart, Store, User, LogOut, Menu, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { user, userProfile } = useAuth()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <nav className="sticky top-0 z-50 w-full glass-nav">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl shadow-lg transition-transform group-hover:scale-105 group-hover:rotate-3">
              M
            </div>
            <span className="text-xl font-bold text-gradient">
              MarketHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors hover:scale-105 transform duration-200">
              Products
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors hover:scale-105 transform duration-200">
              Categories
            </Link>
            {userProfile?.role === "vendor" && (
              <Link
                href="/vendor/dashboard"
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 hover:scale-105 transform duration-200"
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
                <Button variant="ghost" size="icon" asChild className="relative hover:bg-primary/10 transition-colors">
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors">
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
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild className="hover:text-primary">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:scale-105">
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
              <SheetContent side="left" className="w-[280px]">
                <div className="flex flex-col gap-4 mt-8">
                  <Link href="/products" onClick={() => setMobileOpen(false)} className="text-lg font-medium hover:text-primary transition-colors p-3 rounded-lg hover:bg-accent">
                    Products
                  </Link>
                  <Link href="/categories" onClick={() => setMobileOpen(false)} className="text-lg font-medium hover:text-primary transition-colors p-3 rounded-lg hover:bg-accent">
                    Categories
                  </Link>
                  {user && (
                    <Link href="/cart" onClick={() => setMobileOpen(false)} className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2 p-3 rounded-lg hover:bg-accent">
                      <ShoppingCart className="h-5 w-5" />
                      Cart
                    </Link>
                  )}
                  {user && (
                    <Link href="/orders" onClick={() => setMobileOpen(false)} className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2 p-3 rounded-lg hover:bg-accent">
                      <ShoppingBag className="h-5 w-5" />
                      My Orders
                    </Link>
                  )}
                  {userProfile?.role === "vendor" && (
                    <Link
                      href="/vendor/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-medium flex items-center gap-2 hover:text-primary transition-colors p-3 rounded-lg hover:bg-accent"
                    >
                      <Store className="h-5 w-5" />
                      Dashboard
                    </Link>
                  )}
                  {user && (
                    <div className="pt-4 mt-4 border-t">
                      <Button onClick={() => { handleSignOut(); setMobileOpen(false); }} variant="destructive" className="w-full justify-start">
                        <LogOut className="mr-2 h-5 w-5" />
                        Sign Out
                      </Button>
                    </div>
                  )}
                  {!user && (
                    <div className="flex flex-col gap-2 pt-4 mt-4 border-t">
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/login" onClick={() => setMobileOpen(false)}>Login</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href="/signup" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                      </Button>
                    </div>
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
