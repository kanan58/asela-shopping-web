'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Trash2, DollarSign, Package, ShoppingBag, Edit } from 'lucide-react'

export default function AdminPage() {
  // 🔒 Simple Password Protection (Optional but good practice)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  
  // 📦 Data States
  const [products, setProducts] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  
  // 📝 Form States
  const [showForm, setShowForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', category: 'food', image: '📦', description: ''
  })

  // 🔄 Load Data from Local Storage
  useEffect(() => {
    const savedProducts = localStorage.getItem('asela_products')
    const savedOrders = localStorage.getItem('orders')
    
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      // Default products if none exist
      const defaults = [
        { id: 1, name: 'Ethiopian Coffee', price: 250, category: 'coffee', image: '☕', description: 'Premium beans' },
        { id: 2, name: 'Traditional Dress', price: 850, category: 'fashion', image: '👗', description: 'Handwoven' }
      ]
      setProducts(defaults)
      localStorage.setItem('asela_products', JSON.stringify(defaults))
    }

    if (savedOrders) setOrders(JSON.parse(savedOrders))
  }, [])

  // 🔐 Login Function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') { // 🔑 Change this password!
      setIsAuthenticated(true)
    } else {
      alert('Wrong password!')
    }
  }

  // ➕ Add Product Function
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const product = {
      ...newProduct,
      id: Date.now(), // Generate unique ID
      price: Number(newProduct.price)
    }
    
    const updatedProducts = [...products, product]
    setProducts(updatedProducts)
    localStorage.setItem('asela_products', JSON.stringify(updatedProducts)) // Save to DB
    
    setNewProduct({ name: '', price: '', category: 'food', image: '📦', description: '' })
    setShowForm(false)
    alert('Product added successfully! ✅')
  }

  // 🗑️ Delete Product Function
  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== id)
      setProducts(updatedProducts)
      localStorage.setItem('asela_products', JSON.stringify(updatedProducts))
    }
  }

  // 🚪 Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-900">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-2xl w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">🔐 Admin Login</h1>
          <input
            type="password"
            placeholder="Enter Password (admin123)"
            className="w-full p-3 border rounded-lg mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
            Enter Dashboard
          </button>
          <p className="mt-4 text-center text-sm">
            <Link href="/" className="text-blue-500 hover:underline">Back to Shop</Link>
          </p>
        </form>
      </div>
    )
  }

  // 📊 Main Dashboard
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Asela Admin Panel 📊</h1>
          <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg">View Website</Link>
        </div>

        {/* 📈 Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
            <Package className="w-10 h-10 text-blue-600" />
            <div>
              <p className="text-gray-500">Total Products</p>
              <p className="text-3xl font-bold">{products.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
            <ShoppingBag className="w-10 h-10 text-green-600" />
            <div>
              <p className="text-gray-500">Total Orders</p>
              <p className="text-3xl font-bold">{orders.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
            <DollarSign className="w-10 h-10 text-yellow-600" />
            <div>
              <p className="text-gray-500">Revenue</p>
              <p className="text-3xl font-bold">
                {orders.reduce((acc: number, order: any) => acc + order.total, 0)} ETB
              </p>
            </div>
          </div>
        </div>

        {/* 📦 Product Management Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Products Inventory</h2>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
            >
              <Plus className="w-5 h-5" /> Add New Product
            </button>
          </div>

          {/* 📝 Add Product Form */}
          {showForm && (
            <form onSubmit={handleAddProduct} className="bg-gray-50 p-6 rounded-lg mb-6 grid md:grid-cols-2 gap-4 border">
              <input 
                placeholder="Product Name" 
                className="p-2 border rounded"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
              <input 
                type="number"
                placeholder="Price (ETB)" 
                className="p-2 border rounded"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                required
              />
              <select 
                className="p-2 border rounded"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="coffee">Coffee</option>
                <option value="fashion">Fashion</option>
                <option value="food">Food</option>
                <option value="electronics">Electronics</option>
                <option value="home">Home</option>
              </select>
              <input 
                placeholder="Image Emoji (e.g. ☕)" 
                className="p-2 border rounded"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              />
              <textarea 
                placeholder="Description" 
                className="p-2 border rounded md:col-span-2"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              />
              <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 md:col-span-2">
                Save Product
              </button>
            </form>
          )}

          {/* 📋 Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-2xl">{product.image}</td>
                    <td className="p-3 font-bold">{product.name}</td>
                    <td className="p-3 capitalize">{product.category}</td>
                    <td className="p-3">{product.price} ETB</td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 📦 Orders Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any, index: number) => (
                <div key={index} className="border p-4 rounded-lg bg-gray-50">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">Order #{index + 1}</span>
                    <span className="text-green-600 font-bold">{order.total} ETB</span>
                  </div>
                  <p className="text-sm text-gray-600">Customer: {order.customer?.fullName}</p>
                  <p className="text-sm text-gray-600">Phone: {order.customer?.phone}</p>
                  <p className="text-sm text-gray-600">Payment: {order.payment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
