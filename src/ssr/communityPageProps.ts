import { logError } from "@/common/logError";
import { setCommunityData } from "@/features/communities/communitySlice";
import { Community } from "@/features/communities/types";
import fetchCommunity from "@/features/communities/utils/fetchCommunity";
import { AppStore, wrapper } from "@/store/store";
import { getDoc } from "firebase/firestore";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { andThen, otherwise, pipe } from "ramda";

const {
  formatCommunityData,
  getCommunityRef,
  parseCommunityData,
  throwIfCommunityNotFound,
} = fetchCommunity;

const getCommunityIdFromContext = ({ query }: GetServerSidePropsContext) =>
  query.communityId as string;

const dispatchCommunityData = (store: AppStore) => (community: Community) => {
  store.dispatch(setCommunityData(community));
  return community;
};

const returnCommunityData = (community: Community) => ({
  props: { communityData: community },
});

const logErrorIfDevelopment = (error: Error) =>
  logError(error, "Community page SSR error: community not found");

const returnEmptyProps = () => ({ props: {} });

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
          parseCommunityData,
          dispatchCommunityData(store),
          returnCommunityData,
        ),
      ),
      otherwise(pipe(logErrorIfDevelopment, returnEmptyProps)),
    ),
  );
