import PageContent from "@/components/Layout/PageContent";
import { Header } from "@/features/communities/compponents/Header";
import { CommunityNotFound } from "@/features/communities/compponents/NotFound.tsx";
import { useCommunityEffect } from "@/features/communities/hooks/useCommunityEffect";
import { Community } from "@/features/communities/types";
import { useRenderCount } from "@/hooks/useRenderCount";
export { getServerSideProps } from "@/pages/r/[communityId]/serverSideProps";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage = ({ communityData }: CommunityPageProps) => {
  useRenderCount("CommunityPage");
  useCommunityEffect(communityData);
  if (!communityData) return <CommunityNotFound />;
  return (
    <>
      <Header />
      <PageContent>
        <>
          <div>Left!!</div>
          <div>Left!!</div>
          <div>Left!!</div>
          <div>Left!!</div>
          <div>Left!!</div>
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
