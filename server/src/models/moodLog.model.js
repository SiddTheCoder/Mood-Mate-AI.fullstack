import mongoose from "mongoose";

const MoodLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: String,
    emotion: String,
    level: Number,
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const MoodLog = mongoose.model("MoodLog", MoodLogSchema);
