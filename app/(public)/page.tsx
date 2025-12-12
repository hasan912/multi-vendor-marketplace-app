import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { ArrowRight, ShoppingBag, Store, TrendingUp, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#A1C4FD] via-[#C2E9FB] to-[#FAD0C4] py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-balance leading-tight">
              Discover Amazing Products from Top Vendors
            </h1>
            <p className="text-lg md:text-xl text-white/90 text-pretty max-w-2xl mx-auto leading-relaxed">
              Shop from thousands of verified sellers offering unique products at competitive prices. Your perfect
              purchase is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-2xl bg-white text-foreground hover:bg-white/90 shadow-2xl text-lg px-8 py-6 h-auto"
              >
                <Link href="/products">
                  Browse Products <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-2xl border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6 h-auto bg-transparent"
              >
                <Link href="/signup">Become a Vendor</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MarketHub</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The most trusted marketplace for buyers and sellers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShoppingBag,
                title: "Wide Selection",
                description: "Thousands of products from verified vendors",
              },
              {
                icon: Store,
                title: "Trusted Sellers",
                description: "Only verified and rated vendors",
              },
              {
                icon: TrendingUp,
                title: "Best Prices",
                description: "Competitive pricing on all products",
              },
              {
                icon: Shield,
                title: "Secure Shopping",
                description: "Safe and encrypted transactions",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card border border-border hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#A1C4FD] to-[#C2E9FB] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FAD0C4] to-[#FFD1FF]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white text-balance">Start Selling Today</h2>
            <p className="text-lg text-white/90 text-pretty leading-relaxed">
              Join thousands of successful vendors already selling on MarketHub. Set up your store in minutes and reach
              millions of customers.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-2xl bg-white text-foreground hover:bg-white/90 shadow-2xl text-lg px-8 py-6 h-auto"
            >
              <Link href="/signup">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 MarketHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
