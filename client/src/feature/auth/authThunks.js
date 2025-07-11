import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { setUser, setLoading, setError, clearUser } from "../user/userSlice";

// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (registerData, { dispatch, rejectWithValue }) => {
//     try {
//       dispatch(setLoading(true));

//       const response = await axiosInstance.post(
//         "/user/register-user",
//         registerData
//       );
//       console.log(response.data.data);
//       dispatch(setUser(response.data.data.user));
//       return response.data.data;
//     } catch (error) {
//       dispatch(setError(error.response?.data?.message || "Register failed"));
//       return rejectWithValue(error.response?.data || error.message);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   }
// );

// this will login the user (if user sxist), or create a account (if user didnt exist)
export const googleLoginRegister = createAsyncThunk(
  "auth/googleLogin",
  async ({ code }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const response = await axiosInstance.post("/auth/google-auth", { code });
      console.log(
        "Data fetchec while logging from google",
        response.data.data.user
      );
      dispatch(setUser(response.data.data.user));
      return response.data.data;
    } catch (error) {
      console.log("Error occured while logging from google", error);
      return rejectWithValue(error.response?.data || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (loginData, { dispatch, rejectWithValue }) => {
//     try {
//       dispatch(setLoading(true));

//       const response = await axiosInstance.post("/user/login-user", loginData); // POST to your backend

//       dispatch(setUser(response.data.data.user)); // set user in store
//       console.log(response.data.data);
//       return response.data.data;
//     } catch (error) {
//       dispatch(setError(error.response?.data?.message || "Login failed"));
//       return rejectWithValue(error.response?.data || error.message);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   }
// );

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const response = await axiosInstance.post("/auth/logout-user");
      console.log(response.data.data);
      dispatch(clearUser());
      return response.data.data;
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response?.data?.message || "Logout Failed"));
      return rejectWithValue(error.response?.data || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);
