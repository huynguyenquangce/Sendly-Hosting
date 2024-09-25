import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer";
import userReducer from "./reducers/userReducer";
export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
