import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const HF_API_KEY = String(process.env.HF_API_KEY || "").trim();

if (!HF_API_KEY || !HF_API_KEY.startsWith("hf_")) {
  throw new Error(
    "❌ Invalid Hugging Face API key. Make sure it's a string and starts with 'hf_'."
  );
}

const client = new InferenceClient({ accessToken: HF_API_KEY });

/**
 * Basic summarizer: joins messages and compresses the structure
 * You can improve this later using actual summarization models or heuristics.
 */
function summarizeMessages(messages) {
  const text = messages.join(" ");
  const shortened = text
    .replace(/\s+/g, " ") // remove extra spaces
    .replace(/([.?!])\s*/g, "$1 ") // normalize punctuation
    .split(" ")
    .slice(0, 100) // limit to ~100 words
    .join(" ");

  return shortened + "..."; // mark it as summarized
}

/**
 * Calls Hugging Face emotion detection with summarized text
 */
export async function detectEmotion(messages) {
  console.log("ACCESS HF", process.env.HF_API_KEY);
  const summary = summarizeMessages(messages);
  const response = await client.textClassification({
    model: "j-hartmann/emotion-english-distilroberta-base",
    inputs: summary,
  });

  const best = response[0];
  console.log("Detected emotion:", best.label, "with score:", best.score);
  return best.label; // e.g., "joy"
}

// Maps emotion to level
export function mapToLevel(label) {
  const mapping = {
    joy: 5,
    love: 4,
    neutral: 3,
    sadness: 1,
    anger: 2,
    fear: 2,
    surprise: 4,
  };
  return mapping[label] || 3;
}

// Suggestion message per mood level
export function getSuggestion(level) {
  const s = {
    5: '😊 Keep smiling! "Happiness is not by chance, but by choice."',
    4: "😄 You're doing great! Maybe play your favorite song?",
    3: "😐 Feeling neutral? How about a quick walk or break?",
    2: '😟 A bit down? Try: "Breathe. It\'s just a bad day, not a bad life."',
    1: '😢 Stressed? Here\'s one: "Even the darkest night will end and the sun will rise."',
  };
  return s[level];
}
