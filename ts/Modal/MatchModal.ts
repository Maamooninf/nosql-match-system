import mongoose from "mongoose";
import Match from "../interfaces/Matchinterface";
export const matchSchema = new mongoose.Schema<Match>(
  {
    teamone: {
      type: String,
      ref: "Team",
    },
    teamtwo: {
      type: String,
      ref: "Team",
    },
    date: {
      type: Date,
    },
    playerPos: [
      {
        type: String,
        ref: "PlayerPos",
      },
    ],
  },

  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
matchSchema.pre("find", function () {
  this.populate("teamone");
  this.populate("teamtwo");
});
matchSchema.pre("findOne", function () {
  this.populate("teamone");
  this.populate("teamtwo");
});
const MatchModel = mongoose.model<Match>("Match", matchSchema);
export { MatchModel };
