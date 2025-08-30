import { Schema, model, Document } from "mongoose";

export interface IGrossMargin extends Document {
  car: string;
  acquisition: number;
  resale: number;
  reconditioning: number;
  dealer?: string; // optional
}

const GrossMarginSchema = new Schema<IGrossMargin>({
  car: { type: String, required: true },
  acquisition: { type: Number, required: true },
  resale: { type: Number, required: true },
  reconditioning: { type: Number, required: true },
  dealer: { type: String, required: false }, // now optional
});

// export default model<IGrossMargin>("grossMargin", GrossMarginSchema);
export default model<IGrossMargin>("GrossMargin", GrossMarginSchema, "grossMargin");


