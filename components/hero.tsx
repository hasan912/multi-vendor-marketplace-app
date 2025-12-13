"use client";
import React from "react";
import { WavyBackground } from "./ui/wavy-background";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Zap } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <WavyBackground className="max-w-4xl mx-auto pb-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-neutral-200 dark:from-white dark:to-neutral-400 leading-tight">
            MarketHub <br />
            <span className="text-primary">Next-Gen Commerce</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 text-sm sm:text-base md:text-xl text-neutral-200 font-normal inter-var max-w-lg mx-auto px-4"
          >
            Discover millions of products from verified vendors. Experience the
            future of online shopping with lightning fast delivery and secure
            payments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4 w-full max-w-md sm:max-w-none mx-auto"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] w-full sm:w-auto"
              asChild
            >
              <Link href="/products" className="flex items-center justify-center">
                Shop Now <ShoppingBag className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full border-white/20 hover:bg-white/10 text-primary/90 backdrop-blur-sm transition-all w-full sm:w-auto"
              asChild
            >
              <Link href="/categories" className="flex items-center justify-center">
                Explore Categories <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </WavyBackground>
      
      {/* Decorative Gradient Overlay at bottom to blend with content */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent z-10"></div>
    </div>
  );
}
