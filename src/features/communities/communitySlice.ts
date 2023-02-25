import {
  Community,
  CommunitySnippet,
  CommunityState,
} from "@/features/communities/types";
import { RootState } from "@/store/store";
import { RequiredByKeys } from "@/types";
import { filterByCommunityId, findByCommunityId } from "@/utility";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";
import { HYDRATE } from "next-redux-wrapper";

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
  isCommunitySnippetsFetched: false,
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
        state.isCommunityCreateModal = false;
        state.isCommunitySnippetsFetched = false;
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
      state.communitySnippets = filterByCommunityId(
        communityId,
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
    updateCommunityData: (
      state,
      {
        payload,
      }: PayloadAction<RequiredByKeys<Partial<Community>, "communityId">>,
    ) => {
      Object.assign(state.communityData, payload);
    },

    // Community Snippets

    setCommunitySnippets: (
      state,
      { payload: communitySnippets }: PayloadAction<CommunitySnippet[]>,
    ) => {
      state.isCommunitySnippetsFetched = true;
      state.communitySnippets = communitySnippets;
    },
    addCommunitySnippet: (
      state,
      { payload }: PayloadAction<CommunitySnippet>,
    ) => {
      state.communitySnippets.push(payload);
    },
    updateCommunitySnippet: (
      state,
      {
        payload,
      }: PayloadAction<
        RequiredByKeys<Partial<CommunitySnippet>, "communityId">
      >,
    ) => {
      const communitySnippet = findByCommunityId(
        payload.communityId,
        state.communitySnippets,
      );
      communitySnippet && Object.assign(communitySnippet, payload);
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
  updateCommunityData,
  setCommunitySnippets,
  addCommunitySnippet,
  updateCommunitySnippet,
} = communitySlice.actions;

export const selectIsCreateCommunityModalOpen = (state: RootState) =>
  state.communitySlice.isCommunityCreateModal;

export const selectCommunitySnippets = (state: RootState) =>
  state.communitySlice.communitySnippets;

export const selectIsCommunitySnippetsFetched = (state: RootState) =>
  state.communitySlice.isCommunitySnippetsFetched;

export const selectCommunityData = (state: RootState) =>
  state.communitySlice.communityData;

export default communitySlice.reducer;
