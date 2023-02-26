import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type AuthModalView = "login" | "signup" | "resetPassword" | null;

type AuthModal = {
  isAuthModalOpen: boolean;
  authModalView: AuthModalView;
};

export interface AuthState {
  userState: {
    isUserFetched: boolean;
    user: User | null | undefined;
  };
  modal: AuthModal;
}

const initialState: AuthState = {
  userState: {
    isUserFetched: false,
    user: null,
  },
  modal: {
    isAuthModalOpen: false,
    authModalView: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,

    // Auth modal

    openAuthModal: (state, action: PayloadAction<AuthModalView>) => {
      state.modal.isAuthModalOpen = true;
      state.modal.authModalView = action.payload;
    },
    closeAuthModal: (state) => {
      state.modal.isAuthModalOpen = false;
    },

    // Auth user

    setAuthUser: (state, action: PayloadAction<User | null | undefined>) => {
      state.userState.isUserFetched = true;
      state.userState.user = action.payload;
    },
  },
});

export const { openAuthModal, closeAuthModal, logout, setAuthUser } =
  authSlice.actions;

export const selectAuthModalView = (state: RootState) =>
  state.authSlice.modal.authModalView;

export const selectAuthModalIsOpen = (state: RootState) =>
  state.authSlice.modal.isAuthModalOpen;

export const selectUserState = (state: RootState) => state.authSlice.userState;

export const selectUserStateIsUserFetched = (state: RootState) =>
  state.authSlice.userState.isUserFetched;

export const selectUserStateUser = (state: RootState) =>
  state.authSlice.userState.user;

export default authSlice.reducer;
