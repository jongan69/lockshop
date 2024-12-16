import { Suspense } from 'react'
import { getStores } from '@/lib/api'
import StoreGrid from './StoreGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explore Stores | Lockshop',
  description: 'Discover amazing digital stores on Lockshop',
}

export default async function ExplorePage() {
  try {
    const stores = await getStores()

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Stores
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover unique digital stores created by our community
          </p>
        </div>

        <Suspense fallback={<StoreGridSkeleton />}>
          <StoreGrid stores={stores} />
        </Suspense>
      </div>
    )
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Error loading stores
        </h2>
        <p className="text-gray-600 mt-2">
          Please try again later
        </p>
      </div>
    )
  }
}

function StoreGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-6 animate-pulse"
        >
          <div className="h-40 bg-gray-200 rounded-md mb-4" />
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  )
} 