import appReducer from "./appReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
});

export default rootReducer;
