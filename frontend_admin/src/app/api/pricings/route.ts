// app/api/price/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import pricing from "@/models/pricing";

// Connect to MongoDB
async function connectDB() {
  try {
    await dbConnect();
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// GET /api/pricings
export async function GET() {
  await connectDB();

  try {
    const prices = await pricing.find(); // fetch all documents
    return NextResponse.json(prices, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch Price data:", error);
    return NextResponse.json(
      { message: "Failed to fetch Price data" },
      { status: 500 }
    );
  }
}
