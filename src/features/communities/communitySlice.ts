import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

export type CommunityState = {
  isCreateCommunityModalOpen: boolean;
  // isJoinCommunityModalOpen: boolean;
};

const initialState: CommunityState = {
  isCreateCommunityModalOpen: false,
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    openCreateCommunityModal: (state) => {
      state.isCreateCommunityModalOpen = true;
    },
    closeCreateCommunityModal: (state) => {
      state.isCreateCommunityModalOpen = false;
    },
  },
});

export const { openCreateCommunityModal, closeCreateCommunityModal } =
  communitySlice.actions;

export const selectIsCreateCommunityModalOpen = (state: RootState) =>
  state.communitySlice.isCreateCommunityModalOpen;

export default communitySlice.reducer;
