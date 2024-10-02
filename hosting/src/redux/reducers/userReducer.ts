import LoginReducer from "../slice/user/loginSlice";

import LogoutReducer from "../slice/user/logoutSlice";
import { combineReducers } from "redux";

const userReducer = combineReducers({
  login: LoginReducer,
  logout: LogoutReducer,
});

export default userReducer;
