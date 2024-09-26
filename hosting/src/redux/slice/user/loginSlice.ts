import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosConfig from "../../../config/axiosConfig";
import axios from "axios";
interface LoginState {
  password: string;
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
  isLoggined: boolean;
}

const initialState: LoginState = {
  password: "",
  loading: false,
  error: false,
  errorMessage: null,
  isLoggined: false,
};

export const LoginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // const response = await axiosConfig.post("/auth/sign-in", credentials);
      const response = await axios.post(
        "https://asia-southeast1-sendly-email-template-builder.cloudfunctions.net/api/api/auth/sign-in",
        credentials
      );
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
      state.password = "";
      state.loading = false;
      state.error = false;
      state.errorMessage = null;
      state.isLoggined = false;
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
    });

    builder.addCase(LoginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload as string;
    });
  },
});
export const { resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
