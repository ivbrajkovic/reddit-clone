import {
  Community,
  CommunitySnippet,
  CommunityState,
} from "@/features/communities/types";
import { RootState } from "@/store/store";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";
import { HYDRATE } from "next-redux-wrapper";
import { complement, filter, propEq } from "ramda";

const filterByCommunityId = (communityId: string) =>
  filter(complement(propEq("communityId", communityId)));

const initialCommunityData: Community = {
  adultContent: false,
  communityId: "",
  creatorId: "",
  privacyType: "public",
  createdAt: { seconds: 0, nanoseconds: 0 } as Timestamp,
  imageUrl: null,
  membersCount: 0,
};

const initialState: CommunityState = {
  isCommunityCreateModal: false,
  isCommunityLoader: false,
  communitySnippets: [],
  communityData: { ...initialCommunityData },
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase("auth/logout", (state) => {
        state.communitySnippets = [];
        state.isCommunityLoader = false;
        state.isCommunityCreateModal = false;
      })
      .addCase(HYDRATE, (state, action: AnyAction) => {
        if (action.payload.communitySlice.communityData.communityId)
          state.communityData = action.payload.communitySlice.communityData;
      });
  },
  reducers: {
    // Community Create Modal
    openCommunityCreateModal: (state) => {
      state.isCommunityCreateModal = true;
    },
    closeCommunityCreateModal: (state) => {
      state.isCommunityCreateModal = false;
    },

    // Community Loader

    toggleCommunityLoader: (state) => {
      state.isCommunityLoader = !state.isCommunityLoader;
    },

    // Community actions

    joinCommunity: (
      state,
      { payload: communitySnippet }: PayloadAction<CommunitySnippet>,
    ) => {
      state.communitySnippets.push(communitySnippet);
    },
    leaveCommunity: (
      state,
      { payload: communityId }: PayloadAction<string>,
    ) => {
      state.communitySnippets = filterByCommunityId(communityId)(
        state.communitySnippets,
      );
    },

    // Community Data

    resetCommunityData: (state) => {
      state.communityData = { ...initialCommunityData };
    },
    setCommunityData: (state, { payload }: PayloadAction<Community>) => {
      state.communityData = payload;
    },
    setCommunityDataImageUrl: (state, { payload }: PayloadAction<string>) => {
      state.communityData.imageUrl = payload;
    },

    // Community Snippets

    setCommunitySnippets: (
      state,
      { payload: communitySnippets }: PayloadAction<CommunitySnippet[]>,
    ) => {
      state.communitySnippets = communitySnippets;
    },
    resetCommunitySnippets: (state) => {
      state.communitySnippets = [];
    },
  },
});

export const {
  openCommunityCreateModal,
  closeCommunityCreateModal,
  joinCommunity,
  leaveCommunity,
  setCommunityData,
  resetCommunityData,
  setCommunityDataImageUrl,
  toggleCommunityLoader,
  setCommunitySnippets,
  resetCommunitySnippets,
} = communitySlice.actions;

export const selectIsCreateCommunityModalOpen = (state: RootState) =>
  state.communitySlice.isCommunityCreateModal;

export const selectCommunitySnippets = (state: RootState) =>
  state.communitySlice.communitySnippets;

export const selectIsCommunityLoader = (state: RootState) =>
  state.communitySlice.isCommunityLoader;

export const selectCommunityData = (state: RootState) =>
  state.communitySlice.communityData;

export default communitySlice.reducer;
