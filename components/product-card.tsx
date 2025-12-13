import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/firebase/products"
import { ShoppingCart, Store, BadgeCheck } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm">
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square relative bg-muted/30 overflow-hidden">
          {product.images && product.images[0] ? (
            <>
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {/* Multiple images indicator */}
              {product.images.length > 1 && (
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-full flex items-center gap-1.5 font-semibold">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                  {product.images.length}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary/20">
              <Store className="h-16 w-16 text-muted-foreground/50" />
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      
      <CardContent className="p-5">
        <div className="mb-2 flex items-start justify-between">
            <Link href={`/products/${product.id}`}>
            <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {product.title}
            </h3>
            </Link>
        </div>
        <p className="text-sm text-muted-foreground mb-4 font-medium px-2 py-1 rounded-md bg-secondary/50 w-fit">
            {product.category}
        </p>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.stock > 0 ? (
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                <BadgeCheck className="w-3 h-3" /> In Stock
            </div>
          ) : (
            <span className="text-xs font-semibold text-destructive bg-destructive/10 px-2 py-1 rounded-full">
                Out of Stock
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button
          asChild
          className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40"
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
