'use client'
import Link from 'next/link'
import { ShoppingCart, Home, User } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const [cartCount, setCartCount] = useState(0)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check for logged-in user
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) setUser(JSON.parse(currentUser))
    
    // Check cart count
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0))
  }, [])

  return (
    <header className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            🇪🇹 Asela
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="hover:text-yellow-400 transition flex items-center gap-1">
              <Home className="w-5 h-5" /> Home
            </Link>
            <Link href="/products" className="hover:text-yellow-400 transition">
              Products
            </Link>
            
            {/* Cart */}
            <Link href="/cart" className="flex items-center gap-1 hover:text-yellow-400">
              <ShoppingCart className="w-5 h-5" /> 
              <span className="bg-yellow-500 text-blue-900 px-2 rounded-full text-xs font-bold">{cartCount}</span>
            </Link>

            {/* 👤 User Auth Links */}
            {user ? (
              <Link href="/profile" className="flex items-center gap-1 bg-blue-800 px-3 py-1 rounded-full hover:bg-blue-700">
                <User className="w-5 h-5" /> {user.name}
              </Link>
            ) : (
              <>
                <Link href="/login" className="hover:text-yellow-400 transition font-bold">
                  Login
                </Link>
                <Link href="/register" className="bg-yellow-500 text-blue-900 px-4 py-1 rounded-lg font-bold hover:bg-yellow-400">
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex gap-4 items-center">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-blue-900 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <Link href="/profile" className="text-lg">👤</Link>
            ) : (
              <Link href="/login" className="text-lg">🔐</Link>
            )}
          </div>

        </div>
      </div>
    </header>
  )
}
