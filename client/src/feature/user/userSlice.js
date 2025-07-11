import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isUserChecked: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
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
    setUserChecked: (state, action) => {
      state.isUserChecked = true;
    },
    updateUserWishList: (state, action) => {
      state.user.wishListProducts = action.payload;
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  clearUser,
  setUserChecked,
  updateUserWishList,
} = userSlice.actions;

export default userSlice.reducer;
