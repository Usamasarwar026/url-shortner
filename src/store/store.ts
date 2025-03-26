import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice/authSlice";
import urlReducer from "./slice/urlSlice/urlSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    url: urlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
