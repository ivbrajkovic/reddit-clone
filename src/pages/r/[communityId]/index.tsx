import { CreatePostBar } from "@/components/CreatePostBar";
import PageContent from "@/components/Layout/PageContent";
import {
  CommunityAbout,
  CommunityHeader,
  CommunityNotFound,
} from "@/features/communities";
import { withCommunityData } from "@/features/communities/HOC/withCommunityData";
import { Community } from "@/features/communities/types";
import { PostList } from "@/features/posts";
import { withPosts } from "@/features/posts/HOC/withPosts";
import { NextPage } from "next";
export { getServerSideProps } from "@/ssr/communityPageProps";

const PostListWithPosts = withPosts(PostList);
const CommunityAboutWithCommunityData = withCommunityData(CommunityAbout);

type CommunityPageProps = { communityData?: Community };

const CommunityPage: NextPage<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) return <CommunityNotFound />;
  return (
    <>
      <CommunityHeader />
      <PageContent>
        <>
          <CreatePostBar />
          <PostListWithPosts />
        </>
        <>
          <CommunityAboutWithCommunityData />
        </>
      </PageContent>
    </>
  );
};

export default CommunityPage;
