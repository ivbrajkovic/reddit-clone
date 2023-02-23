import PageContent from "@/components/Layout/PageContent";
import { CommunityAboutWrapper } from "@/features/communities/components/CommunityAbout";
import { useFetchCommunityEffect } from "@/features/communities/hooks/useFetchCommunityEffect";
import CreatePost from "@/features/posts/components/CreatePost/CreatePost";
import { Flex, Text } from "@mantine/core";
import { NextPage } from "next";

const SubmitPage: NextPage = () => {
  const { isLoading: isCommunityLoading, communityData } =
    useFetchCommunityEffect();
  return (
    <PageContent>
      <>
        <Flex p={4} sx={{ borderBottom: "1px solid white" }}>
          <Text fz="lg" fw="500" lh="22px" mb="sm">
            Create Post
          </Text>
        </Flex>
        <CreatePost />
      </>
      <CommunityAboutWrapper
        isLoading={isCommunityLoading}
        communityData={communityData}
      />
    </PageContent>
  );
};
export default SubmitPage;
