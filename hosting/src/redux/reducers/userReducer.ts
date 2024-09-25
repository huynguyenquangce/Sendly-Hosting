import LoginReducer from "../slice/user/loginSlice";
import { combineReducers } from "redux";

const userReducer = combineReducers({
  login: LoginReducer,
});

export default userReducer;
