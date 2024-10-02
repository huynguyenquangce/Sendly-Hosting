import appReducer from "./appReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  admin: adminReducer,
});

export default rootReducer;
