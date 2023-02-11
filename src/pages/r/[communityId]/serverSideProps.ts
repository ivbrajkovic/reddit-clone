import { logError } from "@/common/logError";
import { firestore } from "@/firebase/clientApp";
import { jsonParseStringify } from "@/utility";
import { doc, DocumentSnapshot, getDoc } from "firebase/firestore";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { andThen, otherwise, pipe } from "ramda";

const getCommunityIdFromContext = ({ query }: GetServerSidePropsContext) =>
  query.communityId as string;

const getCommunityRef = (communityId: string) =>
  doc(firestore, "communities", communityId);

const throwIfCommunityNotFound = <T extends DocumentSnapshot>(
  docSnap: T,
): T => {
  if (!docSnap.exists()) throw new Error("Community not found");
  return docSnap;
};

const formatCommunityData = (docSnap: DocumentSnapshot) => ({
  communityId: docSnap.id,
  ...docSnap.data(),
});

type CommunityData = ReturnType<typeof formatCommunityData>;
const returnCommunityPageProps = (communityData: CommunityData) => ({
  props: { communityData: communityData },
});

const handleError = (error: Error) => {
  logError(error, "CommunityPage -> getServerSideProps");
  return { props: {} };
};

export const getServerSideProps: GetServerSideProps = pipe(
  getCommunityIdFromContext,
  getCommunityRef,
  getDoc,
  andThen(
    pipe(
      throwIfCommunityNotFound,
      formatCommunityData,
      jsonParseStringify,
      returnCommunityPageProps,
    ),
  ),
  otherwise(handleError),
);
