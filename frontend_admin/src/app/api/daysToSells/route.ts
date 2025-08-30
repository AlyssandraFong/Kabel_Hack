// app/api/daysToSell/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import DaysToSell from "@/models/daysToSell";

// Connect to MongoDB
async function connectDB() {
  try {
    await dbConnect();
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// GET /api/daysToSell
export async function GET() {
  await connectDB();
  try {
    const daysToSell = await DaysToSell.find();
    return NextResponse.json(daysToSell, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 });
  }
}
