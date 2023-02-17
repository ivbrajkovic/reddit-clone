import PageContent from "@/components/Layout/PageContent";
import { AboutCommunity } from "@/features/communities/components/AboutCommunity";
import { CommunityHeader } from "@/features/communities/components/CommunityHeader";
import { CreatePostBar } from "@/features/communities/components/CreatePostBar";
import { CommunityNotFound } from "@/features/communities/components/NotFound.tsx";
import { PostList } from "@/features/posts";
import { useRenderCount } from "@/hooks/useRenderCount";
import { FC } from "react";
export { getServerSideProps } from "@/ssr/communityPageProps";

type CommunityPageProps = {
  isCommunityExists: boolean;
};

const CommunityPage: FC<CommunityPageProps> = ({ isCommunityExists }) => {
  useRenderCount("CommunityPage");

  if (!isCommunityExists) return <CommunityNotFound />;
  return (
    <>
      <CommunityHeader />
      <PageContent>
        <>
          <CreatePostBar />
          <PostList />
        </>
        <>
          <AboutCommunity />
        </>
      </PageContent>
    </>
  );
};

export default CommunityPage;
