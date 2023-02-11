import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import { selectIsLoadingSnippets } from "@/features/communities/communitySlice";
import { useCommunityData } from "@/features/communities/hooks/useCommunityData";
import { useIsUserJoinedInCommunity } from "@/features/communities/hooks/useIsUserJoinedInCommunity";
import { useJoinCommunity } from "@/features/communities/hooks/useJoinCommunity";
import { useLeaveCommunity } from "@/features/communities/hooks/useLeaveCommunity";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useCommunity = () => {
  const user = useSignedInUser();

  const joinCommunity = useJoinCommunity();
  const leaveCommunity = useLeaveCommunity();

  const communityData = useCommunityData();
  const isLoadingSnippets = useSelector(selectIsLoadingSnippets);
  const isUserJoinedInCommunity = useIsUserJoinedInCommunity();

  const handlers = useMemo(() => {
    return {
      joinOrLeaveCommunity: () => {
        if (!user) return;
        isUserJoinedInCommunity
          ? leaveCommunity(user, communityData)
          : joinCommunity(user, communityData);
      },
    };
  }, [
    communityData,
    isUserJoinedInCommunity,
    joinCommunity,
    leaveCommunity,
    user,
  ]);

  return { isUserJoinedInCommunity, isLoading: isLoadingSnippets, ...handlers };
};
