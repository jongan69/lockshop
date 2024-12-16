import { NextResponse } from 'next/server';
import { Store } from '../../../../models/Store';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET() {
  try {
    await connectToDatabase();
    const stores = await Store.find().exec();
    
    return NextResponse.json({ 
      success: true,
      stores: stores.map(store => store.toJSON())
    });
  } catch (error) {
    console.error('Error fetching stores:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch stores',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { db, client } = await connectToDatabase();
    
    const body = await request.json();
    const store = await Store.create(body);
    
    return NextResponse.json({ 
      success: true,
      storeId: store._id.toString() 
    });
  } catch (error) {
    console.error('Error creating store:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create store',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 