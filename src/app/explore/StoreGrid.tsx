'use client'

import Link from 'next/link'
import { Store } from '@/lib/types'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface StoreGridProps {
  stores: Store[]
}

export default function StoreGrid({ stores }: StoreGridProps) {
    console.log(stores)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {stores.map((store, index) => (
        <motion.div
          key={store.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link href={`/store/${store._id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="relative h-48">
                <Image
                  src={store.logo || '/placeholder-store.jpg'}
                  alt={store.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {store.name}
                </h2>
                <p className="text-gray-600 line-clamp-2">
                  {store.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    {store.products?.length || 0} Products
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
} 