import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(
  request: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { name, description, price, image } = await request.json();
    
    // Connect to database
    const { db } = await connectToDatabase();
    
    // Verify store exists and user owns it
    const store = await db.collection('stores').findOne({
      _id: new ObjectId(params.storeId)
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    // Create new product
    const product = {
      storeId: new ObjectId(params.storeId),
      name,
      description,
      price: parseFloat(price),
      image,
      createdAt: new Date(),
    };

    const result = await db.collection('products').insertOne(product);

    return NextResponse.json({ 
      message: 'Product created successfully',
      productId: result.insertedId 
    });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 