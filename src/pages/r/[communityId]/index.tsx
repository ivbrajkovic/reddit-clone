import PageContent from "@/components/Layout/PageContent";
import {
  CommunityAbout,
  CommunityCreatePostBar,
  CommunityHeader,
  CommunityNotFound,
} from "@/features/communities";
import { CommunityProvider } from "@/features/communities/context/communityContext";
import { PostList } from "@/features/posts";
import { PostProvider } from "@/features/posts/context/postContext";
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
    <CommunityProvider>
      <PostProvider>
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
      </PostProvider>
    </CommunityProvider>
  );
};

export default CommunityPage;
