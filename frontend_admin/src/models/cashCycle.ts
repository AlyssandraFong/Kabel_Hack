import mongoose from "mongoose";

const CashCycleSchema = new mongoose.Schema({
  month: { type: String, required: true },
  days: { type: Number, required: true }
});

export default mongoose.models.CashCycle || mongoose.model("cashCycle", CashCycleSchema, "cashCycle");