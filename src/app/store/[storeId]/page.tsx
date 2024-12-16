'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useWallet } from '@solana/wallet-adapter-react';
import AddProductForm from './AddProductForm';
import Modal from '@/components/ui/Modal';

interface Store {
  _id: string;
  name: string;
  description: string;
  logo: string;
  ownerPublicKey: string;
}

export default function StorePage() {
  const params = useParams();
  const router = useRouter();
  const { publicKey } = useWallet();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await fetch(`/api/stores/${params.storeId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch store');
        }

        setStore(data.store);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load store');
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [params.storeId]);

  const isStoreOwner = publicKey?.toBase58() === store?.ownerPublicKey;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">Loading store details...</div>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-red-500">
          {error || 'Store not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-start space-x-6">
          {store.logo && (
            <div className="relative w-32 h-32 flex-shrink-0">
              <Image
                src={store.logo}
                alt={store.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{store.name}</h1>
            <p className="text-gray-600 mb-4">{store.description}</p>
            <div className="text-sm text-gray-500">
              Owner: {store.ownerPublicKey}
            </div>
          </div>
        </div>
      </div>

      {isStoreOwner && (
        <>
          <button
            onClick={() => setIsAddProductModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add New Product
          </button>

          <Modal
            isOpen={isAddProductModalOpen}
            onClose={() => setIsAddProductModalOpen(false)}
            title="Add New Product"
          >
            <AddProductForm 
              storeId={store._id} 
              onSuccess={() => {
                setIsAddProductModalOpen(false);
                router.refresh();
              }}
            />
          </Modal>
        </>
      )}
    </div>
  );
} 