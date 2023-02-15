import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/features/posts/components/CreatePost/NewPostForm";
import { Flex, Text } from "@mantine/core";
import { FC } from "react";

type SubmitPageProps = {};

const SubmitPage: FC<SubmitPageProps> = () => {
  return (
    <PageContent>
      <>
        <Flex p={4} sx={{ borderBottom: "1px solid white" }}>
          <Text fz="lg" fw="500" lh="22px" mb="sm">
            Create Post
          </Text>
        </Flex>
        <NewPostForm />
      </>
      <>{/* Bout */}</>
    </PageContent>
  );
};
export default SubmitPage;
