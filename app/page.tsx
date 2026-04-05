import Link from 'next/link'
import { ShoppingBag, Truck, Shield, Phone } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">🇪</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Asela Shopping Web
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your trusted online marketplace for Asela Town & Arsi Zone
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products" 
                className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition"
              >
                🛍️ Start Shopping
              </Link>
              <Link 
                href="/cart" 
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
              >
                🛒 View Cart
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Shop With Us?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<ShoppingBag className="w-12 h-12 text-blue-600" />}
              title="Wide Selection"
              description="Hundreds of products from local and international sellers"
            />
            <FeatureCard 
              icon={<Truck className="w-12 h-12 text-blue-600" />}
              title="Fast Delivery"
              description="Same-day delivery in Asela Town"
            />
            <FeatureCard 
              icon={<Shield className="w-12 h-12 text-blue-600" />}
              title="Secure Payment"
              description="Telebirr, CBE Birr, and cash on delivery"
            />
            <FeatureCard 
              icon={<Phone className="w-12 h-12 text-blue-600" />}
              title="24/7 Support"
              description="We're here to help whenever you need us"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CategoryCard name="☕ Coffee" href="/products?category=coffee" />
            <CategoryCard name="👕 Fashion" href="/products?category=fashion" />
            <CategoryCard name="📱 Electronics" href="/products?category=electronics" />
            <CategoryCard name="🏠 Home & Garden" href="/products?category=home" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-bold mb-2">Asela Shopping Web 🇪🇹</p>
          <p className="text-blue-200">© 2026 All rights reserved | Built for Asela Town</p>
        </div>
      </footer>
    </main>
  )
}

// Helper Components
function FeatureCard({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function CategoryCard({ name, href }: { name: string, href: string }) {
  return (
    <Link href={href} className="bg-blue-600 text-white p-6 rounded-lg text-center font-bold text-lg hover:bg-blue-700 transition">
      {name}
    </Link>
  )
}
