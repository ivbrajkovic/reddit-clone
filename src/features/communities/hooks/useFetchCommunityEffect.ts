import { selectCommunityData } from "@/features/communities/communitySlice";
import { useFetchCommunity } from "@/features/communities/hooks/useFetchCommunity";
import { delayFn } from "@/utility";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";

const delay500 = (fn: () => void) => delayFn(fn, 500);

export const useFetchCommunityEffect = () => {
  const router = useRouter();
  const fetchCommunity = useFetchCommunity();
  const { communityId, postId } = router.query;
  const communityData = useSelector(selectCommunityData);

  const [isLoading, toggleLoading] = useReducer(
    (s) => !s,
    !Boolean(communityData.communityId),
  );

  useEffect(() => {
    if (!postId) return;
    if (communityData.communityId) return;
    fetchCommunity(communityId as string).then(delay500(toggleLoading));
  }, [communityData.communityId, communityId, fetchCommunity, postId]);

  return { isLoading, communityData };
};
