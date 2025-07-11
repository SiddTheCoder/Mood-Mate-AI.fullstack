// # Handles messages from user & generates AI reply
import { Message } from "../models/Message.model.js";
import { detectEmotion } from "../utils/moodAnalyzer.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Chat } from "../models/Chat.model.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});
const MOOD_TRIGGER_COUNT = 5; // After 5 user messages

function trimRepeatedEmojis(text, maxRepetition = 2) {
  // Match sequences of the same emoji repeated consecutively
  const emojiRepeatRegex = /([\p{Emoji}])\1{2,}/gu;

  return text.replace(emojiRepeatRegex, (_, emoji) =>
    emoji.repeat(maxRepetition)
  );
}

export const sendMessageToActiveChat = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { message } = req.body;

  // Check for existing active chat
  let chat = await Chat.findOne({ user: userId, isActive: true });

  // If no active chat, create one
  if (!chat) {
    chat = await Chat.create({
      user: userId,
      messages: [{ role: "user", content: message }],
    });
  } else {
    // Append new user message to existing chat
    chat.messages.push({ role: "user", content: message });
    await chat.save();
  }

  // Format last 10 messages for AI context
  const formatted = chat.messages.slice(-10).map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  // Call AI
  const completion = await openai.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct",
    messages: formatted,
    temperature: 0.7,
  });

  let aiReply = completion.choices[0].message.content;
  aiReply = trimRepeatedEmojis(aiReply);

  // Append assistant reply
  chat.messages.push({ role: "assistant", content: aiReply });
  await chat.save();

  // Store in Message model too (if you're using it for analytics/logging)
  await Message.create({ user: userId, role: "user", content: message });
  await Message.create({ user: userId, role: "assistant", content: aiReply });

  // Trigger mood detection
  const userMessages = chat.messages
    .filter((msg) => msg.role === "user")
    .slice(-5)
    .map((m) => m.content);

  let mood = null;
  // if (userMessages.length >= 5) {
  //   mood = await detectEmotion(userMessages);
  // }

  res.status(200).json(new ApiResponse(200, { chat, mood }, "Chat with AI"));
});

export const startNewChat = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { message } = req.body;

  // Mark all existing chats as inactive
  await Chat.updateMany(
    { user: userId, isActive: true },
    { $set: { isActive: false } }
  );

  // Create a new active chat
  const newChat = await Chat.create({
    user: userId,
    messages: [{ role: "user", content: message }],
    isActive: true,
  });

  // Log message (optional)
  await Message.create({ user: userId, role: "user", content: message });

  // Start reply chain with just that one message
  const completion = await openai.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct",
    messages: [{ role: "user", content: message }],
    temperature: 0.7,
  });

  const aiReply = completion.choices[0].message.content;

  newChat.messages.push({ role: "assistant", content: aiReply });
  await newChat.save();

  await Message.create({ user: userId, role: "assistant", content: aiReply });

  res.json({ reply: aiReply, chatId: newChat._id });
});

export const getUserAllChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const currentChat = await Chat.findOne({
    user: userId,
    isActive: true,
  }).select("-isActive -__v");

  const remainingChats = await Chat.find({ user: userId, isActive: false })
    .sort({ createdAt: -1 })
    .select("-isActive -__v");

  res.json(
    new ApiResponse(
      200,
      {
        currentChat,
        remainingChats,
      },
      "Fetched all chats"
    )
  );
});

export const offCurrentChat = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  await Chat.updateMany(
    { user: userId, isActive: true },
    { $set: { isActive: false } }
  );
  res.json({ message: "Chat ended" });
});
