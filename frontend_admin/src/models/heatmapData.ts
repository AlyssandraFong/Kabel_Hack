import { Schema, model, Document } from "mongoose";

export interface IHeatMapDatum {
  region: string; // region
  value: number; // value/demand
}

export interface IHeatMap extends Document {
  car: string;
  demand: IHeatMapDatum[];
}

const HeatMapDatumSchema = new Schema<IHeatMapDatum>({
  region: { type: String, required: true },
  value: { type: Number, required: true },
});

const HeatMapSchema = new Schema<IHeatMap>({
  car: { type: String, required: true },
  demand: { type: [HeatMapDatumSchema], required: true },
});

export default model<IHeatMap>("heatmapData", HeatMapSchema, "heatmapData");

