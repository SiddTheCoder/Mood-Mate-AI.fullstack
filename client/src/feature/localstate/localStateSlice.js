import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarCollapsed: false,
  // product search filter state
};

const localStateSlice = createSlice({
  name: "localState",
  initialState,
  reducers: {
    setIsSideBarCollapsed: (state, action) => {
      state.isSideBarCollapsed = action.payload;
    },
  },
});

export const { setIsSideBarCollapsed } = localStateSlice.actions;

export default localStateSlice.reducer;
