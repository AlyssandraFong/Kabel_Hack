import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  name: String,
  dealerId: mongoose.Types.ObjectId
});

export default mongoose.models.Car || mongoose.model("Car", CarSchema);
