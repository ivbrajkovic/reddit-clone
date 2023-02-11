import {
  selectCommunityData,
  selectCommunitySnippets,
} from "@/features/communities/communitySlice";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// TODO: memoize this selector
const isUserJoinedInCommunitySelector = createSelector(
  selectCommunitySnippets,
  selectCommunityData,
  (snippets, community) =>
    snippets.some((snippet) => snippet.communityId === community.communityId),
);

export const useIsUserJoinedInCommunity = () =>
  useSelector(isUserJoinedInCommunitySelector);
