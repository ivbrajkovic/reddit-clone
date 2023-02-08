import { logError } from "@/common/logError";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { pipe, tryCatch } from "ramda";

const CommunityPage = () => {
  return <div>CommunityPage</div>;
};

type Community = {
  id: string;
};

type CommunityPageProps = { community: Community };

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // From route query, can be string or string[] or undefined
    const communityId = context.query.communityId as string;
    if(!communityId) throw new Error("communityId is undefined");

    const docRef = doc(firestore, "communities", communityId);
    const docSnap = await getDoc(docRef);
    const communityData = docSnap.data();

    return { props: { communityData } };
  } catch (error) {
    logError(error as Error);
    return { props: {} };
  }

  // return await tryCatch(async () => {
  //   pipe(
  //     (context: any) => context.query.communityId,
  //     (communityId: string) => {
  //       if (!communityId) throw new Error("communityId is undefined");
  //       return communityId;
  //     },
  //     (communityId: string) => doc(firestore, "communities", communityId),
  //     async (docRef: any) => {
  //       const docSnap = await getDoc(docRef);
  //       const communityData = docSnap.data();
  //       return communityData;
  //     },
  //   )(context);
  // });
};

export default CommunityPage;
