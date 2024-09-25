import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../../config/axiosConfig";
interface LoginState {
  email: string;
  password: string;
  loading: boolean;
  error: boolean;
}

const initialState: LoginState = {
  email: "",
  password: "",
  loading: false,
  error: false,
};

export const LoginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    try {
      const response = await axiosConfig.post("/auth/sign-in", credentials);
      return response.data;
    } catch (error) {
      throw new Error("Failed to call API /auth/signin");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default loginSlice.reducer;
