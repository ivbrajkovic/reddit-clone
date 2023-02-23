import { selectCommunityData } from "@/features/communities/communitySlice";
import { useFetchCommunity } from "@/features/communities/hooks/useFetchCommunity";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";

export const useFetchCommunityEffect = () => {
  const router = useRouter();
  const fetchCommunity = useFetchCommunity();
  const communityData = useSelector(selectCommunityData);

  const [isLoading, toggleLoading] = useReducer(
    (s) => !s,
    !Boolean(communityData.communityId),
  );

  useEffect(() => {
    const communityId = router.query.communityId as string;
    if (!communityId) return;
    if (communityData.communityId) return;
    fetchCommunity(communityId as string).then(toggleLoading);
  }, [communityData.communityId, router.query.communityId, fetchCommunity]);

  return { isLoading, communityData };
};
