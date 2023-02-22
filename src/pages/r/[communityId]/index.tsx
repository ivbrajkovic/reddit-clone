import PageContent from "@/components/Layout/PageContent";
import {
  CommunityAbout,
  CommunityCreatePostBar,
  CommunityHeader,
  CommunityNotFound,
} from "@/features/communities";
import { CommunityProvider } from "@/features/communities/context/communityContext";
import { Community } from "@/features/communities/types";
import { PostList } from "@/features/posts";
import { PostProvider } from "@/features/posts/context/postContext";
import { useRenderCount } from "@/hooks/useRenderCount";
import { FC } from "react";
export { getServerSideProps } from "@/ssr/communityPageProps";

type CommunityPageProps = {
  communityData?: Community;
};

const CommunityPage: FC<CommunityPageProps> = ({ communityData }) => {
  useRenderCount("CommunityPage");

  if (!communityData) return <CommunityNotFound />;
  return (
    <CommunityProvider>
      <PostProvider>
        <CommunityHeader communityData={communityData} />
        <PageContent>
          <>
            <CommunityCreatePostBar />
            <PostList />
          </>
          <>
            <CommunityAbout communityData={communityData} />
          </>
        </PageContent>
      </PostProvider>
    </CommunityProvider>
  );
};

export default CommunityPage;
