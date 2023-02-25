import PageContent from "@/components/Layout/PageContent";
import { CommunityAbout } from "@/features/communities/components/CommunityAbout";
import { withFetchCommunityData } from "@/features/communities/HOC/withFetchCommunityData";
import CreatePost from "@/features/posts/components/CreatePost/CreatePost";
import { Flex, Text } from "@mantine/core";
import { NextPage } from "next";

const CommunityAboutWithData = withFetchCommunityData(CommunityAbout);

const SubmitPage: NextPage = () => {
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
      <CommunityAboutWithData />
    </PageContent>
  );
};
export default SubmitPage;
