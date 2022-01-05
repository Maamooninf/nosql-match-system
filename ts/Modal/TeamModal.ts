import mongoose from "mongoose";

import { Team } from "../interfaces/Teaminterface";
export const TeamSchema = new mongoose.Schema<Team>(
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
const TeamModel = mongoose.model<Team>("Team", TeamSchema);
export { TeamModel };
