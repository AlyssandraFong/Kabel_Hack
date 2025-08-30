import { Schema, model, Document } from "mongoose";

export interface IDaysToSell extends Document {
  car: string;
  days: number;
}

const DaysToSellSchema = new Schema<IDaysToSell>({
  car: { type: String, required: true },
  days: { type: Number, required: true }
});

export default model<IDaysToSell>("daysToSell", DaysToSellSchema, "daysToSell");

