import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../../config/axiosConfig";
// import axios from "axios";
interface LoginState {
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
  isLoggined: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
}

const initialState: LoginState = {
  loading: false,
  error: false,
  errorMessage: null,
  isLoggined: false,
  accessToken: "",
  refreshToken: "",
  userId: "",
};

export const LoginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosConfig.post("/auth/sign-in", credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to call API /auth/sign-in"
      );
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetLogin: (state) => {
      state.loading = false;
      state.error = false;
      state.errorMessage = null;
      state.isLoggined = false;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isLoggined = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = null;
    });

    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.isLoggined = true;
      state.accessToken = action.payload.data.access_token;
      state.refreshToken = action.payload.data.refresh_token;
      state.userId = action.payload.data.user.userID;
    });

    builder.addCase(LoginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload as string;
    });
  },
});
export const { resetLogin, updateAccessToken } = loginSlice.actions;
export default loginSlice.reducer;
