import authSlice from "@/features/auth/authSlice";
import communitySlice from "@/features/communities/communitySlice";
import directorySlice from "@/features/directory/directorySlice";
import postsSlice from "@/features/posts/postsSlice";
import { isDevEnv } from "@/utility";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

export const makeStore = () =>
  configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: {
      authSlice: authSlice,
      communitySlice: communitySlice,
      postSlice: postsSlice,
      directorySlice: directorySlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // TODO: Remove this line when the issue is fixed
        // serverTimestamp from firestore is not serializable
        serializableCheck: false,
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const storeWrapper = createWrapper<AppStore>(makeStore, {
  debug: isDevEnv(),
});
