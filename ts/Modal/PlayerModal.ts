import mongoose from "mongoose";
import { Player } from "../interfaces/Playerinterface.js";
export const playerSchema = new mongoose.Schema<Player>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    team: {
      type: String,
      ref: "Team",
    },
    position: {
      type: String,
      ref: "Position",
    },
  },

  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
playerSchema.pre("find", function () {
  this.populate("team", "name");
  this.populate("position", "name");
});
playerSchema.pre("findOne", function () {
  this.populate("team", "name");
  this.populate("position", "name ");
});
const PlayerModel = mongoose.model<Player>("Player", playerSchema);
export { PlayerModel };
