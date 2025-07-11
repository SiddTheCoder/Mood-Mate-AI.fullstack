import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    trim: true,
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  attachments: [
    {
      type: String, // URL or path to the attachment
    },
  ],
  isRead: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);