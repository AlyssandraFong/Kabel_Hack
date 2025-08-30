// app/api/grossMargins/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GrossMargin from '@/models/grossMargin';

// Connect to MongoDB
async function connectDB() {
  try {
    await dbConnect();
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// GET /api/grossMargins
export async function GET() {
  await connectDB();
  try {
    const grossMargins = await GrossMargin.find();
    return NextResponse.json(grossMargins, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 });
  }
}
