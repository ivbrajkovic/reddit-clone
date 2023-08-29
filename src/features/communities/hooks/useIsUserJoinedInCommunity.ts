import {
  selectCommunityData,
  selectCommunitySnippetsIndexLookupById,
} from "@/features/communities/communitySlice";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const isUserJoinedInCommunitySelector = createSelector(
  selectCommunitySnippetsIndexLookupById,
  selectCommunityData,
  (snippetsLookup, community) =>
    snippetsLookup[community.communityId] !== undefined,
);

export const useIsUserJoinedInCommunity = () =>
  useSelector(isUserJoinedInCommunitySelector);
