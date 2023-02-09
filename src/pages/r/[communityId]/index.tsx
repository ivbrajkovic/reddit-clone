import { Header } from "@/features/communities/compponents/Header";
import { CommunityNotFound } from "@/features/communities/compponents/NotFound.tsx";
import { Community } from "@/features/communities/types";
import { useRenderCount } from "@/hooks/useRenderCount";
export { getServerSideProps } from "@/pages/r/[communityId]/serverSideProps";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage = ({ communityData }: CommunityPageProps) => {
  useRenderCount("CommunityPage");

  if (!communityData) return <CommunityNotFound />;

  return (
    <>
      <Header communityData={communityData} />
      {/* <p>{JSON.stringify(communityData.createdAt)}</p> */}
    </>
  );
};

export default CommunityPage;
