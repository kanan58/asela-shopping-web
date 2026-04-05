'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    // Load cart from local storage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    // Save cart to local storage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, change: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + change)
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  // 🛒 If cart is empty, show this message
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Your cart is empty 🛒</h1>
          <Link href="/products" className="text-blue-600 hover:underline text-xl">
            Go Shopping →
          </Link>
        </div>
      </div>
    )
  }

  // 🛒 If cart has items, show this screen
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* 1. List of Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow flex gap-4 items-center">
                <div className="text-5xl">{item.image}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-600">{item.price} ETB each</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl">{item.price * item.quantity} ETB</p>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Order Summary Box */}
          <div className="bg-white p-6 rounded-lg shadow h-fit">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold">{total} ETB</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className="font-bold">50 ETB</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>{total + 50} ETB</span>
              </div>
            </div>
            
            {/* ✅ THIS IS THE BUTTON THAT TAKES YOU TO CHECKOUT */}
            <Link 
              href="/checkout"
              className="block w-full bg-yellow-500 text-blue-900 text-center py-4 rounded-lg font-bold text-xl hover:bg-yellow-400 transition shadow-lg"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
