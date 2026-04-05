'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Smartphone, CreditCard, Truck, CheckCircle, Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  
  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('telebirr')
  const [telebirrNumber, setTelebirrNumber] = useState('')
  
  // Delivery Info
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('Asela')

  useEffect(() => {
    // 1. Get Cart
    const savedCart = localStorage.getItem('cart')
    if (savedCart) setCart(JSON.parse(savedCart))
    else router.push('/products') // Redirect if cart empty

    // 2. Get User (to pre-fill name/phone)
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) setUser(JSON.parse(currentUser))
    else {
      // If not logged in, suggest they login (optional logic)
      // For now, we allow guest checkout but prompt for details
    }
  }, [])

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = 50
  const grandTotal = totalAmount + deliveryFee

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // ⏳ SIMULATE PAYMENT PROCESSING (Wait 2 seconds)
    setTimeout(() => {
      // 1. Create Order Object
      const newOrder = {
        id: Date.now(),
        customer: user || { name: 'Guest', phone: telebirrNumber },
        items: cart,
        total: grandTotal,
        deliveryFee: deliveryFee,
        paymentMethod: paymentMethod,
        status: paymentMethod === 'cod' ? 'Pending Payment' : 'Paid ✅',
        date: new Date().toISOString(),
        deliveryAddress: address
      }

      // 2. Save to "Database" (LocalStorage)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      existingOrders.push(newOrder)
      localStorage.setItem('orders', JSON.stringify(existingOrders))

      // 3. Clear Cart
      localStorage.removeItem('cart')

      // 4. Go to Success Page
      setLoading(false)
      router.push('/success')
    }, 2000) // 2 second delay to look like real processing
  }

  if (cart.length === 0) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 🚚 Delivery Details */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" /> Delivery Details
            </h2>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={user?.name}
                  required
                  className="w-full p-3 border rounded-lg mt-1" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">Phone Number</label>
                <input 
                  type="tel" 
                  defaultValue={user?.phone}
                  required
                  className="w-full p-3 border rounded-lg mt-1" 
                  placeholder="09..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">Delivery Address</label>
                <textarea 
                  required
                  className="w-full p-3 border rounded-lg mt-1" 
                  rows={3}
                  placeholder="Kebele, House Number, Near Landmark..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select City</label>
                <select 
                  className="w-full p-3 border rounded-lg"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option>Asela</option>
                  <option>Addis Ababa</option>
                  <option>Adama</option>
                </select>
              </div>
            </form>
          </div>

          {/* 💳 Payment & Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4 text-sm">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>{item.price * item.quantity} ETB</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2 font-bold">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{totalAmount} ETB</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee} ETB</span>
                </div>
                <div className="flex justify-between text-xl text-blue-900 pt-2">
                  <span>Total</span>
                  <span>{grandTotal} ETB</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                
                {/* Telebirr Option */}
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'telebirr' ? 'border-blue-500 bg-blue-50' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="telebirr" 
                    checked={paymentMethod === 'telebirr'} 
                    onChange={() => setPaymentMethod('telebirr')}
                    className="w-5 h-5 text-blue-600"
                  />
                  <Smartphone className="w-6 h-6 ml-3 text-blue-500" />
                  <span className="ml-3 font-bold">Telebirr</span>
                </label>

                {/* Cash on Delivery Option */}
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod" 
                    checked={paymentMethod === 'cod'} 
                    onChange={() => setPaymentMethod('cod')}
                    className="w-5 h-5 text-blue-600"
                  />
                  <Truck className="w-6 h-6 ml-3 text-green-600" />
                  <span className="ml-3 font-bold">Cash on Delivery</span>
                </label>
              </div>

              {/* Telebirr Number Input (Conditional) */}
              {paymentMethod === 'telebirr' && (
                <div className="mt-4">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Telebirr Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="09..." 
                    className="w-full p-3 border rounded-lg"
                    value={telebirrNumber}
                    onChange={(e) => setTelebirrNumber(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">We will send a payment request to this number.</p>
                </div>
              )}

              {/* Submit Button */}
              <button 
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full mt-6 bg-yellow-500 text-blue-900 font-bold py-4 rounded-lg text-lg hover:bg-yellow-400 transition disabled:opacity-50 flex justify-center items-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Processing...
                  </>
                ) : (
                  <>Pay {grandTotal} ETB</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
