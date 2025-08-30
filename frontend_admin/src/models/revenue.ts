import mongoose from "mongoose";

const RevenueSchema = new mongoose.Schema({
  month: { type: String, required: true },
  resale: { type: Number, required: true },
  financing: { type: Number, required: true },
  warranties: { type: Number, required: true }
});

export default mongoose.models.Revenue || mongoose.model("revenue", RevenueSchema, "revenue");
