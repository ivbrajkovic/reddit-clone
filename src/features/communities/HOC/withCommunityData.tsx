import { selectCommunityData } from "@/features/communities/communitySlice";
import { Community } from "@/features/communities/types";
import { useSelector } from "react-redux";

type T = { communityData: Community };

export const withCommunityData = <P extends T>(
  Component: React.ComponentType<P>,
) => {
  const WithCommunityData = (props: Omit<P, keyof T>) => {
    const communityData = useSelector(selectCommunityData);
    return <Component {...(props as P)} communityData={communityData} />;
  };

  return WithCommunityData;
};
