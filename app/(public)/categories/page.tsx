"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { CATEGORIES } from "@/lib/firebase/products"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8\">
        <div className="mb-8\">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient\">
            Shop by Category
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base\">Browse products by your favorite categories</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">        {CATEGORIES.map((category) => (            <Link key={category} href={`/products?category=${encodeURIComponent(category)}`}>              <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer rounded-2xl border-border">               <CardContent className="p-4 sm:p-6 md:p-8">
           
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
