import { selectCommunityData } from "@/features/communities/communitySlice";
import { useFetchCommunity } from "@/features/communities/hooks/useFetchCommunity";
import { Community } from "@/features/communities/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type T = { isLoading?: boolean; communityData: Community };

export const withFetchCommunityData = <P extends T>(
  Component: React.ComponentType<P>,
) => {
  const WithFetchCommunityData = (props: Omit<P, keyof T>) => {
    const router = useRouter();
    const fetchCommunity = useFetchCommunity();
    const communityData = useSelector(selectCommunityData);

    const communityId = router.query.communityId as string;
    const isSameCommunity = communityId === communityData.communityId;

    const [isLoading, setLoading] = useState(!isSameCommunity);

    useEffect(() => {
      if (!communityId) return;
      if (isSameCommunity) return;
      const unsetLoading = () => setLoading(false);
      fetchCommunity(communityId as string).then(unsetLoading);
    }, [isSameCommunity, communityId, fetchCommunity]);

    return (
      <Component
        {...(props as P)}
        isLoading={isLoading}
        communityData={communityData}
      />
    );
  };

  return WithFetchCommunityData;
};
