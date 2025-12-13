"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ArrowRight, ShoppingBag, Store, TrendingUp, Shield, Zap, Sparkles, CreditCard } from "lucide-react"
import { motion } from "framer-motion"

export default function HomePage() {
  const features = [
    {
      icon: ShoppingBag,
      title: "Vast Selection",
      description: "Discover thousands of unique items from verified independent sellers.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Shop with confidence using our bank-grade encrypted payment systems.",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Real-time tracking and expedited shipping options for your needs.",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      icon: Sparkles,
      title: "Quality Assured",
      description: "Every product is vetted to meet our strict quality standards.",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <Hero />

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
              Why Choose <span className="text-primary">MarketHub</span>?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl">
              We're revolutionizing the marketplace experience with cutting-edge features and unmatched reliability.
            </p>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/50 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`h-14 w-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto space-y-6 sm:space-y-8 p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] bg-linear-to-b from-card to-background border border-border shadow-2xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
              Start Selling to <span className="text-gradient">Millions</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our community of successful vendors. Setup your shop in minutes and instantly access a global customer base.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-7 h-auto shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all font-semibold"
              >
                <Link href="/signup">
                  Get Started Now
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-2 text-lg px-10 py-7 h-auto hover:bg-secondary/50 transition-all font-semibold"
              >
                <Link href="/login">
                  Vendor Login
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border pt-12 sm:pt-16 pb-6 sm:pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">M</div>
                <span className="text-xl font-bold">MarketHub</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The next generation marketplace for everyone. Secure, fast, and reliable.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 sm:mb-6">Shop</h4>
              <ul className="space-y-3 sm:space-y-4 text-muted-foreground text-sm">
                <li className="hover:text-primary cursor-pointer transition-colors">All Products</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Featured</li>
                <li className="hover:text-primary cursor-pointer transition-colors">New Arrivals</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Categories</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 sm:mb-6">Support</h4>
              <ul className="space-y-3 sm:space-y-4 text-muted-foreground text-sm">
                <li className="hover:text-primary cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Contact Us</li>
              </ul>
            </div>
            
             <div>
              <h4 className="font-bold mb-4 sm:mb-6">Connect</h4>
              <div className="flex gap-3 sm:gap-4">
                  {/* Social placeholders */}
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                      <Store className="h-5 w-5" />
                  </div>
                   <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                      <Sparkles className="h-5 w-5" />
                  </div>
              </div>
            </div>
            
          </div>
          
          <div className="border-t border-border pt-6 sm:pt-8 text-center text-muted-foreground text-xs sm:text-sm">
            <p>&copy; {new Date().getFullYear()} MarketHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
