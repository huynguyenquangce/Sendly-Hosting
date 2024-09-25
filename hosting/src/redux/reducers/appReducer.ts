import languageReducer from "../slice/app/languageSlice";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  language: languageReducer,
});

export default appReducer;
