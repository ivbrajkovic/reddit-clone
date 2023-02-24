import PageContent from "@/components/Layout/PageContent";
import {
  CommunityAbout,
  CommunityCreatePostBar,
  CommunityHeader,
  CommunityNotFound,
} from "@/features/communities";
import { Community } from "@/features/communities/types";
import { PostList } from "@/features/posts";
import { useRenderCount } from "@/hooks/useRenderCount";
import { NextPage } from "next";
export { getServerSideProps } from "@/ssr/communityPageProps";

type CommunityPageProps = {
  communityData?: Community;
};

const CommunityPage: NextPage<CommunityPageProps> = ({ communityData }) => {
  useRenderCount("CommunityPage");

  if (!communityData) return <CommunityNotFound />;
  return (
    <>
      <CommunityHeader />
      <PageContent>
        <>
          <CommunityCreatePostBar />
          <PostList />
        </>
        <>
          <CommunityAbout />
        </>
      </PageContent>
    </>
  );
};

export default CommunityPage;
