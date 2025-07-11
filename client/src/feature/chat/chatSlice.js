import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  currentChat: null,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
      state.loading = false;
    },
    clearChat: (state) => {
      state.currentChat = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      setTimeout(() => {
        state.error = null;
      }, 4000);
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const { setChats, clearChat, setLoading, setError, setCurrentChat } =
  chatSlice.actions;

export default chatSlice.reducer;