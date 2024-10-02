import { combineReducers } from "redux";
import PermissionReducer from "../slice/user/permissionSlice";
import UserListReducer from "../slice/user/userSlice";
const adminReducer = combineReducers({
  permission: PermissionReducer,
  listuser: UserListReducer,
});

export default adminReducer;
