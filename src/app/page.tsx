import { Store } from '../../models/Store';
import { connectToDatabase } from '../lib/mongodb';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  try {
    const mongoose = await connectToDatabase();
    const stores = await Store.find({});
    
    if (!mongoose) {
      throw new Error('Failed to connect to database');
    }

    return (
      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                Launch Your Solana Store Today
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-purple-100">
                Create your own digital storefront and start selling products on the Solana blockchain in minutes
              </p>
              <Link 
                href="/create-store" 
                className="inline-block px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-purple-50 transform hover:scale-105 transition-all"
              >
                Start Your Store →
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quick Setup</h3>
              <p className="text-gray-600">Launch your store in minutes with our easy-to-use platform</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Solana Payments</h3>
              <p className="text-gray-600">Accept fast and secure payments using Solana</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Analytics</h3>
              <p className="text-gray-600">Track your sales and growth with detailed analytics</p>
            </div>
          </div>
        </div>

        {/* Showcase Section */}
        {stores.length > 0 && (
          <div className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-12">Featured Stores</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stores.map((store: any) => (
                  <Link 
                    key={store._id.toString()} 
                    href={`/store/${store._id.toString()}`}
                    className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {store.logo && (
                      <Image 
                        src={store.logo} 
                        alt={store.name} 
                        className="w-full h-48 object-cover"
                        width={500}
                        height={300}
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{store.name}</h3>
                      <p className="text-gray-600">{store.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-purple-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Selling?</h2>
            <p className="text-xl mb-8 text-purple-200">Join the future of e-commerce with Solana</p>
            <Link 
              href="/create-store" 
              className="inline-block px-8 py-4 bg-purple-600 rounded-full font-bold text-lg hover:bg-purple-700 transform hover:scale-105 transition-all"
            >
              Create Your Store →
            </Link>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading stores:', error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Error loading stores. Please try again later.</p>
      </div>
    );
  }
} 