'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Get users from database
    const users = JSON.parse(localStorage.getItem('asela_users') || '[]')
    
    // Find user
    const user = users.find((u: any) => u.phone === phone && u.password === password)

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      alert('Welcome back, ' + user.name + '! 🎉')
      router.push('/profile')
    } else {
      alert('Phone number or password incorrect ❌')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back! 👋</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="0911 234 567"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <Link href="/register" className="text-blue-600 font-bold hover:underline">Register</Link>
        </p>
        <Link href="/" className="block text-center mt-4 text-gray-400 hover:text-gray-600">← Back to Shop</Link>
      </div>
    </div>
  )
}
