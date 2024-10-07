import languageReducer from "../slice/app/languageSlice";
import sectionReducer from "../slice/app/sectionSlice";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  language: languageReducer,
  section: sectionReducer,
});

export default appReducer;
