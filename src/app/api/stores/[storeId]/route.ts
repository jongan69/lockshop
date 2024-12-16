import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../lib/mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { db } = await connectToDatabase();
    
    // Validate storeId format
    if (!ObjectId.isValid(params.storeId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid store ID' },
        { status: 400 }
      );
    }

    const store = await db
      .collection('stores')
      .findOne({ _id: new ObjectId(params.storeId) });

    if (!store) {
      return NextResponse.json(
        { success: false, error: 'Store not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      store: {
        ...store,
        _id: store._id.toString(),
      },
    });
  } catch (error) {
    console.error('Error fetching store:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch store' },
      { status: 500 }
    );
  }
} 