// app/api/cars/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import cashCycle from '@/models/cashCycle';

// Connect to MongoDB
async function connectDB() {
  try {
    await dbConnect();
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// GET /api/cars
export async function GET() {
  await connectDB();
  try {
    const cashCycles = await cashCycle.find();
    return NextResponse.json(cashCycles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch cash cycles' }, { status: 500 });
  }
}
