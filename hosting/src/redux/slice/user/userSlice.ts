import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../../config/axiosConfig";

interface UserListState {
  userList: any[];
}
const initialState: UserListState = {
  userList: [],
};

export const getUser = createAsyncThunk("staffs/list", async () => {
  try {
    const response = await axiosConfig.get("/staffs/list?size=5&page=0");
    return response.data.data;
  } catch (error: any) {
    console.error(error, "Error from call API /staff/list");
  }
});

const userSlice = createSlice({
  name: "list-user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, () => {});

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.userList = action.payload;
      console.log(state.userList, "hello huy");
    });

    builder.addCase(getUser.rejected, () => {});
  },
});
export const {} = userSlice.actions;
export default userSlice.reducer;
