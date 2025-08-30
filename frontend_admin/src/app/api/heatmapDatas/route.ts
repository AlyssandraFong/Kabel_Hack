// app/api/heatMapDatas/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import heatmapData from "@/models/heatmapData";

// Connect to MongoDB
async function connectDB() {
  try {
    await dbConnect();
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// GET /api/heatMapDatas
export async function GET() {
  await connectDB();
  try {
    const data = await heatmapData.find();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 });
  }
}
