import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/firebase/products"
import { ShoppingCart, Store } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl border-border overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square relative bg-muted overflow-hidden">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Store className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors text-balance">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </span>
          {product.stock > 0 ? (
            <span className="text-xs text-green-600 font-medium">In Stock</span>
          ) : (
            <span className="text-xs text-destructive font-medium">Out of Stock</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          asChild
          className="w-full rounded-xl bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] hover:opacity-90 text-white"
        >
          <Link href={`/products/${product.id}`}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
