'use client'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-tight hover:text-purple-200 transition-colors duration-200"
          >
            Lockshop
          </Link>
          
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-8 mr-4">
              <Link 
                href="/create-store" 
                className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
              >
                Create Store
              </Link>
              <Link 
                href="/explore" 
                className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
              >
                Explore
              </Link>
            </nav>
            <WalletMultiButton className="!bg-white/10 hover:!bg-white/20 transition-colors duration-200" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 