import {
  Community,
  CommunitySnippet,
  CommunityState,
} from "@/features/communities/types";
import { RootState } from "@/store/store";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { any, complement, filter, propEq } from "ramda";

const filterByCommunityId = (communityId: string) =>
  filter(complement(propEq("communityId", communityId)));

const hasCommunityId = (communityId: string) =>
  any(propEq("communityId", communityId));

const checkIfUserJoinedInCurrentCommunity = (
  communityId: string | undefined,
  communitySnippets: CommunitySnippet[],
) => (communityId ? hasCommunityId(communityId)(communitySnippets) : false);

const initialCommunityData: Community = {
  adultContent: false,
  communityId: "",
  creatorId: "",
  privacyType: "public",
  createdAt: null,
  imageUrl: null,
  membersCount: 0,
};

const initialState: CommunityState = {
  isCreateCommunityModalOpen: false,
  isLoadingSnippets: false,
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
        state.isLoadingSnippets = false;
        state.isCreateCommunityModalOpen = false;
      })
      .addCase(HYDRATE, (state, action: AnyAction) => {
        state.communityData = action.payload.communitySlice.communityData;
      });
  },
  reducers: {
    openCommunityCreateModal: (state) => {
      state.isCreateCommunityModalOpen = true;
    },
    closeCommunityCreateModal: (state) => {
      state.isCreateCommunityModalOpen = false;
    },

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

    setCommunityData: (state, { payload }: PayloadAction<Community>) => {
      state.communityData = payload;
    },

    resetCommunityData: (state) => {
      state.communityData = { ...initialCommunityData };
    },

    toggleIsLoadingSnippets: (state) => {
      state.isLoadingSnippets = !state.isLoadingSnippets;
    },
    setCommunitySnippets: (
      state,
      { payload: communitySnippets }: PayloadAction<CommunitySnippet[]>,
    ) => {
      state.communitySnippets = communitySnippets;
    },
    clearCommunitySnippets: (state) => {
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
  toggleIsLoadingSnippets,
  setCommunitySnippets,
  clearCommunitySnippets,
} = communitySlice.actions;

export const selectIsCreateCommunityModalOpen = (state: RootState) =>
  state.communitySlice.isCreateCommunityModalOpen;

export const selectCommunitySnippets = (state: RootState) =>
  state.communitySlice.communitySnippets;

export const selectIsLoadingSnippets = (state: RootState) =>
  state.communitySlice.isLoadingSnippets;

export const selectCommunityData = (state: RootState) =>
  state.communitySlice.communityData;

export default communitySlice.reducer;
