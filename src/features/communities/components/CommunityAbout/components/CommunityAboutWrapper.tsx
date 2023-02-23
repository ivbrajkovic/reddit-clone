import { CommunityAbout } from "@/features/communities/components/CommunityAbout";
import { CommunityAboutLoader } from "@/features/communities/components/CommunityAboutLoader";
import { CommunityNotFound } from "@/features/communities/components/CommunityNotFound";
import { Community } from "@/features/communities/types";
import { FC } from "react";

type CommunityAboutWrapperProps = {
  isLoading: boolean;
  communityData?: Community;
};
const CommunityAboutWrapper: FC<CommunityAboutWrapperProps> = (props) => {
  if (props.isLoading) return <CommunityAboutLoader />;
  if (!props.communityData) return <CommunityNotFound />;
  return <CommunityAbout communityData={props.communityData} />;
};

export default CommunityAboutWrapper;
