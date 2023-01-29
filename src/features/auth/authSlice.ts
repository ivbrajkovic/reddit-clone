import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalView = "login" | "signup" | "resetPassword";

export interface AuthState {
  modalView: ModalView;
}

const initialState: AuthState = {
  modalView: "login",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setModalView: (state, action: PayloadAction<ModalView>) => {
      state.modalView = action.payload;
    },
  },
});

export const { setModalView } = authSlice.actions;

export const selectModalView = (state: RootState) => state.authSlice.modalView;

export default authSlice.reducer;
