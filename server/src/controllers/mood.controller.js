//  # Analyze & store mood history
import asyncHandler from "../utils/asyncHandler.js";
import { MoodLog } from "../models/moodLog.model.js";

import { detectEmotion, mapToLevel, getSuggestion } from "../utils/moodAnalyzer.js";

export const analyzeMood = asyncHandler(async (req, res) => {
  const { message, userId } = req.body;
  const label = await detectEmotion(message);
  const level = mapToLevel(label);
  const suggestion = getSuggestion(level);

  // optionally save to DB: userId, label, level, message, timestamp
  const moodLog = new MoodLog({
    userId,
    message,
    emotion: label,
    level,
  });
  res.json({ label, level, suggestion });
});