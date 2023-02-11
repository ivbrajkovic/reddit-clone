import modalSlice from "@/components/Modal/modalSlice";
import authSlice from "@/features/auth/authSlice";
import communitySlice from "@/features/communities/communitySlice";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

export const makeStore = () =>
  configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: {
      modalSlice: modalSlice,
      authSlice: authSlice,
      communitySlice: communitySlice,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
