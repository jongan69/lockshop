import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

type ProductResponse = {
  message?: string;
  productId?: ObjectId;
  error?: string;
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<ProductResponse>> {
  try {
    const storeId = req.nextUrl.pathname.split('/')[3]; // Get storeId from URL
    const body = await req.json();
    
    // Connect to database
    const { db } = await connectToDatabase();
    
    // Verify store exists and user owns it
    const store = await db.collection('stores').findOne({
      _id: new ObjectId(storeId)
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    // Create new product
    const product = {
      storeId: new ObjectId(storeId),
      name: body.name,
      description: body.description,
      price: parseFloat(body.price),
      image: body.image,
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