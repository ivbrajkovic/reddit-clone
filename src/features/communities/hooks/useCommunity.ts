import {
  joinCommunity,
  leaveCommunity,
  selectIsLoadingSnippets,
  selectIsUserJoinedInCurrentCommunity,
} from "@/features/communities/communitySlice";
import { useCommunityCreateModal } from "@/features/communities/hooks/useCommunityCreateModal";
import { useCommunityData } from "@/features/communities/hooks/useCommunityData";
import { useAppDispatch } from "@/store/hooks";
import { ifElse, pipe } from "ramda";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useCommunity = () => {
  const dispatch = useAppDispatch();

  const communityData = useCommunityData();
  const isLoadingSnippets = useSelector(selectIsLoadingSnippets);
  const isUserJoinedInCommunity = useSelector(
    selectIsUserJoinedInCurrentCommunity,
  );

  const { closeCommunityCreateModal, openCommunityCreateModal } =
    useCommunityCreateModal();

  const handlers = useMemo(() => {
    return {
      joinCommunity: pipe(joinCommunity, dispatch),
      leaveCommunity: pipe(leaveCommunity, dispatch),
      joinOrLeaveCommunity: ifElse(
        () => isUserJoinedInCommunity,
        () => dispatch(leaveCommunity(communityData.communityId)),
        () =>
          dispatch(
            joinCommunity({
              imageUrl: communityData.imageUrl,
              communityId: communityData.communityId,
              isModerator: false,
            }),
          ),
      ),
    };
  }, [communityData, dispatch, isUserJoinedInCommunity]);

  return { isUserJoinedInCommunity, isLoadingSnippets, ...handlers };
};
