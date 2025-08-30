import { Schema, model, Document } from "mongoose";

export interface IDaysToSell extends Document {
  car: string;
  days: number;
  dealer: string;
}

const DaysToSellSchema = new Schema<IDaysToSell>({
  car: { type: String, required: true },
  days: { type: Number, required: true },
  dealer: { type: String, required: true },
});

export default model<IDaysToSell>("DaysToSell", DaysToSellSchema);
