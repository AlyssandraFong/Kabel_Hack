"use client"
import { Button } from "@/components/button"
import { Moon, Sun, Car, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export function Navbar() {
  const { setTheme, theme } = useTheme()
  
  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="relative backdrop-blur-xl bg-white/5 dark:bg-black/20 rounded-full shadow-2xl shadow-black/5 dark:shadow-white/5">
        <div className="flex items-center justify-between h-12 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Car className="h-6 w-6 text-blue-500 group-hover:text-blue-400 transition-colors duration-200" />
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-semibold text-foreground">CarMarket Admin</span>
            </div>
          </Link>

          {/* Center Menu */}
          <div className="hidden md:flex items-center space-x-1">
              <Button
                variant="ghost"
                className="text-foreground/80 hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105"
                asChild
              >
                <Link href="/business-kpi">Business KPI</Link>
              </Button>
            
            <Button 
              variant="ghost" 
              className="text-foreground/80 hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105" 
              asChild
            >
              <Link href="/car-pricing">Car Pricing</Link>
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-foreground/80 hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105" 
              asChild
            >
              <Link href="/financials">Financials</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}