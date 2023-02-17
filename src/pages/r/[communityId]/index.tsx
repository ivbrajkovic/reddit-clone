import PageContent from "@/components/Layout/PageContent";
import { AboutCommunity } from "@/features/communities/components/AboutCommunity";
import { CreatePostBar } from "@/features/communities/components/CreatePostBar";
import { Header } from "@/features/communities/components/Header";
import { CommunityNotFound } from "@/features/communities/components/NotFound.tsx";
import { PostList } from "@/features/posts";
import { FC } from "react";
export { getServerSideProps } from "@/ssr/communityPageProps";

type CommunityPageProps = {
  isCommunityExists: boolean;
};

const CommunityPage: FC<CommunityPageProps> = ({ isCommunityExists }) => {
  if (!isCommunityExists) return <CommunityNotFound />;
  return (
    <>
      <Header />
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
