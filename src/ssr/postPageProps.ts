import { AppStore, storeWrapper } from "@/store/store";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const getCommunityIdFromContext = ({ query }: GetServerSidePropsContext) =>
  query.communityId as string;

export const getServerSideProps: GetServerSideProps =
  storeWrapper.getServerSideProps((store: AppStore) => async (context) => {
    // const communityId = getCommunityIdFromContext(context);
    const communityId = store.getState().communitySlice.communityData;

    return {
      props: { communityId },
    };
  });
