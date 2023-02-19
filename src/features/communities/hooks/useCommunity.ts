import { useAuthModalHandlers } from "@/features/auth/hooks/useAuthModalHandlers";
import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import { isUser } from "@/features/auth/utility";
import { selectIsCommunityLoader } from "@/features/communities/communitySlice";
import { useCommunityData } from "@/features/communities/context/communityContext";
import { useIsUserJoinedInCommunity } from "@/features/communities/hooks/useIsUserJoinedInCommunity";
import { useJoinCommunity } from "@/features/communities/hooks/useJoinCommunity";
import { useLeaveCommunity } from "@/features/communities/hooks/useLeaveCommunity";
import { useEventCallback } from "@/hooks/useEventCallback";
import { User } from "firebase/auth";
import { ifElse } from "ramda";
import { useSelector } from "react-redux";

export const useCommunity = () => {
  const user = useSignedInUser();

  const { openLogin } = useAuthModalHandlers();

  const communityData = useCommunityData();
  const joinCommunity = useJoinCommunity();
  const leaveCommunity = useLeaveCommunity();

  const isUserJoinedInCommunity = useIsUserJoinedInCommunity();
  const isCommunityLoader = useSelector(selectIsCommunityLoader);

  const joinOrLeaveCommunity = useEventCallback(() => {
    const joinOrLeave = ifElse(
      (_user: User) => isUserJoinedInCommunity,
      (user) => leaveCommunity(user, communityData),
      (user) => joinCommunity(user, communityData),
    );
    ifElse(isUser, joinOrLeave, openLogin)(user);
  });

  return {
    isLoading: isCommunityLoader,
    isUserJoinedInCommunity,
    joinOrLeaveCommunity,
  };
};
