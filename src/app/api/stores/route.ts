import { NextResponse } from 'next/server';
import { Store } from '../../../../models/Store';
import { connectToDatabase } from '../../../lib/mongodb';
import mongoose from 'mongoose';

async function ensureConnection() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectToDatabase();
    }
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Failed to establish database connection');
    }
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export async function GET() {
  try {
    await ensureConnection();
    
    const stores = await Promise.race([
      Store.find().lean().exec(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Query timeout')), 5000)
      )
    ]);
    
    return NextResponse.json({ 
      success: true,
      stores
    });
  } catch (error) {
    console.error('Error fetching stores:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message
      : 'Unknown error';
      
    const status = errorMessage.includes('timeout') ? 504 : 500;
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch stores',
        details: errorMessage
      },
      { status }
    );
  }
}

export async function POST(request: Request) {
  try {
    await ensureConnection();
    
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