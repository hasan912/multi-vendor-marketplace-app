"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signUp, type UserRole } from "@/lib/firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Sparkles, ArrowRight, UserPlus } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [role, setRole] = useState<UserRole>("customer")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signUp(email, password, role, displayName)
      toast({
        title: "Account created!",
        description: "Welcome to MarketHub.",
      })

      if (role === "vendor") {
        router.push("/vendor/dashboard")
      } else {
        router.push("/")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Background blobs */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />

      <Card className="w-full max-w-lg border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl relative z-10 transition-all duration-300 hover:shadow-primary/10">
        <CardHeader className="space-y-2 text-center pb-8 border-b border-border/30 mb-6 bg-linear-to-b from-primary/5 to-transparent pt-8">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                <UserPlus size={24} />
            </div>
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-500">
            Join MarketHub
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground/80">Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="ml-1 text-sm font-medium">Display Name</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="John Doe"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="rounded-xl h-11 border-border/50 bg-background/50 focus:bg-background transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="ml-1 text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl h-11 border-border/50 bg-background/50 focus:bg-background transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="ml-1 text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="rounded-xl h-11 border-border/50 bg-background/50 focus:bg-background transition-all"
              />
            </div>
            <div className="space-y-3 pt-2">
              <Label className="ml-1 text-sm font-medium">Account Type</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="grid grid-cols-2 gap-4">
                <div className={`flex flex-col space-y-2 rounded-xl border p-4 cursor-pointer transition-all ${role === 'customer' ? 'border-primary bg-primary/5' : 'border-border/50 hover:bg-muted/50'}`}>
                  <RadioGroupItem value="customer" id="customer" className="sr-only" />
                  <Label htmlFor="customer" className="cursor-pointer flex-1">
                    <div className="font-semibold text-lg mb-1">Customer</div>
                    <div className="text-xs text-muted-foreground">Browse and purchase products</div>
                  </Label>
                </div>
                <div className={`flex flex-col space-y-2 rounded-xl border p-4 cursor-pointer transition-all ${role === 'vendor' ? 'border-primary bg-primary/5' : 'border-border/50 hover:bg-muted/50'}`}>
                  <RadioGroupItem value="vendor" id="vendor" className="sr-only" />
                  <Label htmlFor="vendor" className="cursor-pointer flex-1">
                    <div className="font-semibold text-lg mb-1">Vendor</div>
                    <div className="text-xs text-muted-foreground">Sell your products</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button
              type="submit"
              className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
              disabled={loading}
            >
              {loading ? "Creating account..." : <span className="flex items-center">Create Account <ArrowRight className="ml-2 w-4 h-4" /></span>}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline transition-colors hover:text-primary/80">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
