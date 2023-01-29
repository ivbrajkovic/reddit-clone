import modalSlice from "@/components/Modal/modalSlice";
import authSlice from "@/features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    modalSlice: modalSlice,
    authSlice: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;