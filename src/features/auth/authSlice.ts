import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type View = "login" | "signup" | "resetPassword" | null;

export interface AuthState {
  isAuthModalOpen: boolean;
  authModalView: View;
}

const initialState: AuthState = {
  isAuthModalOpen: false,
  authModalView: "login",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openAuthModal: (state, action: PayloadAction<View>) => {
      state.isAuthModalOpen = true;
      state.authModalView = action.payload;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    logout: (state) => {
      state.isAuthModalOpen = false;
    },
  },
});

export const { openAuthModal, closeAuthModal, logout } = authSlice.actions;

export const selectAuthModalView = (state: RootState) =>
  state.authSlice.authModalView;
export const selectAuthModalIsOpen = (state: RootState) =>
  state.authSlice.isAuthModalOpen;

export default authSlice.reducer;
