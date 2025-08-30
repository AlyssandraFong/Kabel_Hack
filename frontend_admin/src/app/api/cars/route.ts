// app/api/cars/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Car from '@/models/cars';

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
    const cars = await Car.find();
    return NextResponse.json(cars, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch cars' }, { status: 500 });
  }
}
