'use client'
import Link from 'next/link'
import { CheckCircle, ShoppingBag } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full">
        
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed! 🎉</h1>
        <p className="text-gray-600 mb-8">
          Thank you for shopping with Asela Shopping Web. Your order has been received and is being processed.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-8 text-left">
          <p className="font-bold text-gray-700 mb-2">What happens next?</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>We will call you to confirm delivery.</li>
            <li>Estimated delivery: 1-2 days.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Link 
            href="/profile" 
            className="bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" /> View My Orders
          </Link>
          <Link 
            href="/" 
            className="text-blue-600 font-bold hover:underline py-2"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
