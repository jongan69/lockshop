import { NextRequest, NextResponse } from 'next/server';
import { Store } from '../../../../../models/Store';
import { connectToDatabase } from '../../../../lib/mongodb';
import mongoose from 'mongoose';

interface StoreDocument {
  _id: mongoose.Types.ObjectId;
  __v: number;
  [key: string]: any;
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const storeId = req.nextUrl.pathname.split('/')[3];

    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid store ID' },
        { status: 400 }
      );
    }

    const store = await Store.findById(storeId).lean() as StoreDocument;

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