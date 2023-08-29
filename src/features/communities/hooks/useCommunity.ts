import { selectUserStateIsUserFetched } from "@/features/auth/authSlice";
import { useAuthModalHandlers } from "@/features/auth/hooks/useAuthModalHandlers";
import { useUser } from "@/features/auth/hooks/useSignedInUser";
import { isUser } from "@/features/auth/utility/utility";
import { selectCommunityData } from "@/features/communities/communitySlice";
import { useIsUserJoinedInCommunity } from "@/features/communities/hooks/useIsUserJoinedInCommunity";
import { useJoinCommunity } from "@/features/communities/hooks/useJoinCommunity";
import { useLeaveCommunity } from "@/features/communities/hooks/useLeaveCommunity";
import { useEventCallback } from "@/hooks/useEventCallback";
import { User } from "firebase/auth";
import { ifElse } from "ramda";
import { useSelector } from "react-redux";

export const useCommunity = () => {
  const user = useUser();

  const { openLogin } = useAuthModalHandlers();

  const communityData = useSelector(selectCommunityData);
  const joinCommunity = useJoinCommunity();
  const leaveCommunity = useLeaveCommunity();

  const isUserJoinedInCommunity = useIsUserJoinedInCommunity();
  const isUserFetched = useSelector(selectUserStateIsUserFetched);

  const joinOrLeaveCommunity = useEventCallback(() => {
    const joinOrLeave = ifElse(
      (_user: User) => isUserJoinedInCommunity,
      (user) => leaveCommunity(user, communityData),
      (user) => joinCommunity(user, communityData),
    );
    ifElse(isUser, joinOrLeave, openLogin)(user);
  });

  return {
    isLoading: !isUserFetched,
    isUserJoinedInCommunity,
    joinOrLeaveCommunity,
  };
};
