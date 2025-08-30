import { Schema, model, Document } from "mongoose";

export interface IPrice extends Document {
  car: string;
  actual: number;
  predicted: number;
}

const PriceSchema = new Schema<IPrice>({
  car: { type: String, required: true },
  actual: { type: Number, required: true },
  predicted: { type: Number, required: true },
});

export default model<IPrice>("Price", PriceSchema);
