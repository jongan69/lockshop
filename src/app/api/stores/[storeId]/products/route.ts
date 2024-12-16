import { NextRequest, NextResponse } from 'next/server';
import { Store } from '../../../../../../models/Store';
import { Product } from '../../../../../../models/Product';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

type ProductResponse = {
  message?: string;
  productId?: string;
  error?: string;
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<ProductResponse>> {
  try {
    const storeId = req.nextUrl.pathname.split('/')[3];
    const body = await req.json();
    
    await connectToDatabase();
    
    const store = await Store.findById(storeId);
    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    const product = await Product.create({
      storeId: new mongoose.Types.ObjectId(storeId),
      name: body.name,
      description: body.description,
      price: parseFloat(body.price),
      image: body.image,
      createdAt: new Date(),
    });

    return NextResponse.json({ 
      message: 'Product created successfully',
      productId: product._id.toString()
    });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 