import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  role: { type: String, default: "user" }
});

export default models.User || model("User", UserSchema);
