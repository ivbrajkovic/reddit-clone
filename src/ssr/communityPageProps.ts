import { logError } from "@/common/logError";
import { setCommunityData } from "@/features/communities/communitySlice";
import { Community } from "@/features/communities/types";
import { firestore } from "@/firebase/clientApp";
import { AppStore, wrapper } from "@/store/store";
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

const formatCommunityData = (docSnap: DocumentSnapshot) =>
  ({
    communityId: docSnap.id,
    ...docSnap.data(),
  } as Community);

const dispatchCommunityData = (store: AppStore) => (community: Community) => {
  store.dispatch(setCommunityData(community));
  return community;
};

const returnCommunityExists = (community: Community) => ({
  props: { isCommunityExists: !!community },
});

const logErrorIfDevelopment = (error: Error) =>
  logError(error, "CommunityPage -> getServerSideProps");

const returnCommunityNotExists = () => ({
  props: { isCommunityExists: false },
});

/**
 * SSR rendering of community page
 * Get community data from firestore on server side and dispatch it to redux store
 */
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) =>
    pipe(
      getCommunityIdFromContext,
      getCommunityRef,
      getDoc,
      andThen(
        pipe(
          throwIfCommunityNotFound,
          formatCommunityData,
          jsonParseStringify,
          dispatchCommunityData(store),
          returnCommunityExists,
        ),
      ),
      otherwise(pipe(logErrorIfDevelopment, returnCommunityNotExists)),
    ),
  );
