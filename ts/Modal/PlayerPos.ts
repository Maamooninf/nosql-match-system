import mongoose from "mongoose";
import { PlayerPos } from "../interfaces/PlayerPosinter";
export const playerPosSchema = new mongoose.Schema<PlayerPos>(
  {
    player: {
      type: String,
      ref: "Player",
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
playerPosSchema.pre("find", function () {
  this.populate("player", "name _id");
  this.populate("position", "name _id");
});
playerPosSchema.pre("findOne", function () {
  this.populate("player", "name _id");
  this.populate("position", "name _id");
});
const playerPosModel = mongoose.model<PlayerPos>("PlayerPos", playerPosSchema);
export { playerPosModel };
