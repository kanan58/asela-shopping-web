'use client'
import Link from 'next/link'
import { ShoppingCart, Home } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0))
    }

    updateCartCount()
    window.addEventListener('storage', updateCartCount)
    return () => window.removeEventListener('storage', updateCartCount)
  }, [])

  return (
    <header className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            🇪 Asela Shopping
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="hover:text-yellow-400 transition flex items-center gap-1">
              <Home className="w-5 h-5" /> Home
            </Link>
            <Link href="/products" className="hover:text-yellow-400 transition">
              Products
            </Link>
            <Link href="/cart" className="hover:text-yellow-400 transition flex items-center gap-1">
              <ShoppingCart className="w-5 h-5" /> Cart
              {cartCount > 0 && (
                <span className="bg-yellow-500 text-blue-900 px-2 py-0.5 rounded-full text-sm font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden flex gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-blue-900 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
