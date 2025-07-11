import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { setChats, setCurrentChat, setLoading } from "./chatSlice";
import { setMessages } from "../message/messageSlice";

// Thunk to send message to active chat and receive AI response
export const sendMessageToActiveChat = createAsyncThunk(
  "chat/sendMessageToActiveChat",
  async (message, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/chat/send-message", {
        message,
      });
      console.log("Message Sebt", response.data.data);
      console.log("Message Sebt --", response.data.data.chat.messages);
      dispatch(setMessages(response.data.data.chat.messages));
      return response.data.data; // { chat, mood }
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);

// Thunk to fetch all chats of the user (active and remaining)
export const getUserAllChats = createAsyncThunk(
  "chat/getUserAllChats",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.get("/chat/get-all-chats");
      const chats = response.data.data;

      dispatch(setMessages(chats.currentChat.messages));
      dispatch(setCurrentChat(chats.currentChat));
      dispatch(setChats(chats.remainingChats));

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch chats"
      );
    }
  }
);

export const createChat = createAsyncThunk(
  "chat/createChat",
  async (chatData) => {
    const response = await axiosInstance.post("/chat/create-chat", chatData);
    return response.data.data.chat;
  }
);

export const endCurrentChat = createAsyncThunk(
  "chat/endCurrentChat",
  async () => {
    const response = await axiosInstance.post("/chat/end-current-chat");
    return response.data.data;
  }
);
