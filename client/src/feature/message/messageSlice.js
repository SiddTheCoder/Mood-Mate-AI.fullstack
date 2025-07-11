import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  // currentChat: null,
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
    },
    clearMessages: (state) => {
      state.messages = [];
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
  },
});

export const { setMessages, clearMessages, setLoading, setError } =
  messageSlice.actions;

export default messageSlice.reducer;
