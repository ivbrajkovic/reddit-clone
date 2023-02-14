import PageContent from "@/components/Layout/PageContent";
import { CreatePostBar } from "@/features/communities/components/CreatePostBar";
import { Header } from "@/features/communities/components/Header";
import { CommunityNotFound } from "@/features/communities/components/NotFound.tsx";
import Posts from "@/features/posts/components/PostItem/Posts";
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
          <Posts />
        </>
        <>
          <div>Right!!</div>
          <div>Right!!</div>
          <div>Right!!</div>
        </>
      </PageContent>
    </>
  );
};

export default CommunityPage;
