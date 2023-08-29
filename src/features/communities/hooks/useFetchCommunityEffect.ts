import { selectCommunityData } from "@/features/communities/communitySlice";
import { useFetchCommunity } from "@/features/communities/hooks/useFetchCommunity";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useFetchCommunityEffect = () => {
  const router = useRouter();
  const fetchCommunity = useFetchCommunity();
  const communityData = useSelector(selectCommunityData);

  const communityId = router.query.communityId as string;
  const isSameCommunity = communityId === communityData.communityId;

  const [isLoading, setLoading] = useState(!isSameCommunity);

  useEffect(() => {
    if (isSameCommunity) return;
    const unsetLoading = () => setLoading(false);
    fetchCommunity(communityId as string).then(unsetLoading);
  }, [communityId, fetchCommunity, isSameCommunity]);

  return { isLoading, communityData };
};
