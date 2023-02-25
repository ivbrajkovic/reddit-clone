import { useFetchCommunityEffect } from "@/features/communities/hooks/useFetchCommunityEffect";
import { Community } from "@/features/communities/types";

type T = { isLoading?: boolean; communityData: Community };

export const withFetchCommunityData = <P extends T>(
  Component: React.ComponentType<P>,
) => {
  const WithFetchCommunityData = (props: Omit<P, keyof T>) => {
    const { isLoading, communityData } = useFetchCommunityEffect();
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
