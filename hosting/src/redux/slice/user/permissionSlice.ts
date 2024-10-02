import { createSlice } from "@reduxjs/toolkit";
interface Role {
  id: string;
  role: string;
}
interface ChangeButtonRoleState {
  isChangeButtonRole: boolean;
  roleList: Role[];
}

const initialState: ChangeButtonRoleState = {
  isChangeButtonRole: false,
  roleList: [],
};

const ChangeButtonRoleSlice = createSlice({
  name: "button-role",
  initialState,
  reducers: {
    resetRoleChange: (state) => {
      state.isChangeButtonRole = false;
    },
    onChangeButtonRole: (state) => {
      state.isChangeButtonRole = true;
    },
    onPushRole: (state, action) => {
      state.roleList.push(action.payload);
    },
  },
  extraReducers: () => {},
});
export const { onChangeButtonRole, resetRoleChange, onPushRole } =
  ChangeButtonRoleSlice.actions;
export default ChangeButtonRoleSlice.reducer;
