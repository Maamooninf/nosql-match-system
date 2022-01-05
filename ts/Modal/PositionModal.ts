import mongoose from "mongoose";
import { Position } from "../interfaces/Positioninterface";
export const psotionSchema = new mongoose.Schema<Position>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
const PositionModel = mongoose.model<Position>("Position", psotionSchema);
export { PositionModel };
