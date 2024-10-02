import { createSlice } from "@reduxjs/toolkit";

interface LogoutState {}

const initialState: LogoutState = {};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    onLogout: () => {},
  },
  extraReducers: () => {},
});
export const {} = logoutSlice.actions;
export default logoutSlice.reducer;
