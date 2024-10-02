import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/rootReducer";
// Cấu hình persist
const persistConfig = {
  key: "root", // Key dùng để lưu state trong storage
  storage, // Loại storage (localStorage)
  whitelist: ["user", "admin"], // Chỉ định reducer nào sẽ được lưu trữ, ví dụ: 'user'
};

// Tạo persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store với persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt kiểm tra serializable để tránh lỗi với redux-persist
    }),
});

// Tạo persistor để điều khiển việc lưu trữ
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
