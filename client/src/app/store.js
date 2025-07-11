import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user/userSlice";
import localStateReducer from "../feature/localstate/localStateSlice";
import chatReducer from "../feature/chat/chatSlice"
import messageReducer from "../feature/message/messageSlice";
// import storeReducer from "../features/store/storeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    localState: localStateReducer,
    chat: chatReducer,
    message: messageReducer,
  },
});
