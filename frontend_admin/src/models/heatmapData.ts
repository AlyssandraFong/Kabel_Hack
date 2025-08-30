import { Schema, model, Document } from "mongoose";

export interface IHeatMapDatum {
  x: string; // region
  y: number; // value/demand
}

export interface IHeatMap extends Document {
  car: string;
  data: IHeatMapDatum[];
}

const HeatMapDatumSchema = new Schema<IHeatMapDatum>({
  x: { type: String, required: true },
  y: { type: Number, required: true },
});

const HeatMapSchema = new Schema<IHeatMap>({
  car: { type: String, required: true },
  data: { type: [HeatMapDatumSchema], required: true },
});

export default model<IHeatMap>("HeatMap", HeatMapSchema);
