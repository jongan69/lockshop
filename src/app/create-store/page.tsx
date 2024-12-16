'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface StoreFormData {
  name: string;
  description: string;
  logo: string;
}

const initialFormData: StoreFormData = {
  name: '',
  description: '',
  logo: ''
};

const FormField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  disabled,
  required = false 
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled: boolean;
  required?: boolean;
}) => (
  <div>
    <label className="block mb-2 text-gray-700">{label}</label>
    {type === 'textarea' ? (
      <textarea
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded bg-white text-gray-900 placeholder-gray-400"
        disabled={disabled}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded bg-white text-gray-900 placeholder-gray-400"
        required={required}
        disabled={disabled}
      />
    )}
  </div>
);

const ImageUploadField = ({ 
  value,
  onChange,
  disabled
}: {
  value: string;
  onChange: (url: string) => void;
  disabled: boolean;
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        onChange(data.url);
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block mb-2 text-gray-700">Store Logo</label>
      <div className="space-y-4">
        {value && (
          <div className="relative w-32 h-32">
            <Image
              src={value}
              alt="Store logo preview"
              fill
              className="rounded object-cover"
            />
          </div>
        )}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || uploading}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              disabled={disabled}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled || uploading}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default function CreateStore() {
  const { publicKey } = useWallet();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<StoreFormData>(initialFormData);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (field: keyof StoreFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ownerPublicKey: publicKey.toString()
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push(`/store/${data.storeId}`);
      } else {
        throw new Error(data.error || 'Failed to create store');
      }
    } catch (error) {
      console.error('Error creating store:', error);
      alert('Failed to create store. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return null;
  }

  if (!publicKey) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Create Your Store</h1>
        <p className="mb-4">Please connect your wallet to create a store</p>
        <div className="flex justify-center">
          <WalletMultiButton />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create Your Store</h1>
        <WalletMultiButton />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Store Name"
          value={formData.name}
          onChange={handleInputChange('name')}
          disabled={isSubmitting}
          required
        />

        <FormField
          label="Description"
          type="textarea"
          value={formData.description}
          onChange={handleInputChange('description')}
          disabled={isSubmitting}
        />

        <ImageUploadField
          value={formData.logo}
          onChange={(url) => setFormData(prev => ({ ...prev, logo: url }))}
          disabled={isSubmitting}
        />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Store'}
        </button>
      </form>
    </div>
  );
} 