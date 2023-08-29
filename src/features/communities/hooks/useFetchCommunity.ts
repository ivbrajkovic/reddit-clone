import { setCommunityData } from "@/features/communities/communitySlice";
import fetchCommunity from "@/features/communities/utils/fetchCommunity";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch } from "@/store/hooks";
import { getDoc } from "firebase/firestore";
import { andThen, otherwise, pipe } from "ramda";

const {
  formatCommunityData,
  getCommunityRef,
  parseCommunityData,
  throwIfCommunityNotFound,
  errorFetchingCommunityData,
} = fetchCommunity;

export const useFetchCommunity = () => {
  const dispatch = useAppDispatch();
  return useEventCallback(async (communityId: string) => {
    return pipe(
      getCommunityRef,
      getDoc,
      andThen(
        pipe(
          throwIfCommunityNotFound,
          formatCommunityData,
          parseCommunityData,
          setCommunityData,
          dispatch,
        ),
      ),
      otherwise(errorFetchingCommunityData),
    )(communityId);
  });
};
