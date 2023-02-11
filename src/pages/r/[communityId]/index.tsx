import PageContent from "@/components/Layout/PageContent";
import { Header } from "@/features/communities/compponents/Header";
import { CommunityNotFound } from "@/features/communities/compponents/NotFound.tsx";
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
