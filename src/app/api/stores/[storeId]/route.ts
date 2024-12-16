import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../lib/mongodb';

export async function GET(
  req: NextRequest
) {
  try {
    const { db } = await connectToDatabase();
    
    const storeId = req.nextUrl.pathname.split('/')[3]; // Get storeId from URL

    // Validate storeId format
    if (!ObjectId.isValid(storeId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid store ID' },
        { status: 400 }
      );
    }

    const store = await db
      .collection('stores')
      .findOne({ _id: new ObjectId(storeId) });

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