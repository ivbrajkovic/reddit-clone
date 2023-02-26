import {
  Community,
  CommunitySnippet,
  CommunitySnippetsState,
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

const initialCommunitySnippetsState: CommunitySnippetsState = {
  isCommunitySnippetsFetched: false,
  communitySnippets: [],
  communitySnippetsIndexLookupById: {},
};

const initialState: CommunityState = {
  isCommunityCreateModal: false,
  communityData: { ...initialCommunityData },
  communitySnippetsState: { ...initialCommunitySnippetsState },
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase("auth/logout", (state) => {
        state.communitySnippetsState.communitySnippets = [];
        state.isCommunityCreateModal = false;
        state.communitySnippetsState.isCommunitySnippetsFetched = false;
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
      state.communitySnippetsState.communitySnippets.push(communitySnippet);
      state.communitySnippetsState.communitySnippetsIndexLookupById[
        communitySnippet.communityId
      ] = state.communitySnippetsState.communitySnippets.length - 1;
    },
    leaveCommunity: (
      state,
      { payload: communityId }: PayloadAction<string>,
    ) => {
      state.communitySnippetsState.communitySnippets = filterByCommunityId(
        communityId,
        state.communitySnippetsState.communitySnippets,
      );
      delete state.communitySnippetsState.communitySnippetsIndexLookupById[
        communityId
      ];
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
      {
        payload,
      }: PayloadAction<
        Omit<CommunitySnippetsState, "isCommunitySnippetsFetched">
      >,
    ) => {
      state.communitySnippetsState.isCommunitySnippetsFetched = true;
      state.communitySnippetsState.communitySnippets =
        payload.communitySnippets;
      state.communitySnippetsState.communitySnippetsIndexLookupById =
        payload.communitySnippetsIndexLookupById;
    },
    addCommunitySnippet: (
      state,
      { payload }: PayloadAction<CommunitySnippet>,
    ) => {
      state.communitySnippetsState.communitySnippets.push(payload);
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
        state.communitySnippetsState.communitySnippets,
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
  state.communitySlice.communitySnippetsState.communitySnippets;

export const selectIsCommunitySnippetsFetched = (state: RootState) =>
  state.communitySlice.communitySnippetsState.isCommunitySnippetsFetched;

export const selectCommunitySnippetsState = (state: RootState) =>
  state.communitySlice.communitySnippetsState;

export const selectCommunityData = (state: RootState) =>
  state.communitySlice.communityData;

export default communitySlice.reducer;
