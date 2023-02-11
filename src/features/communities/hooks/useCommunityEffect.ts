import {
  resetCommunityData,
  setCommunityData,
} from "@/features/communities/communitySlice";
import { Community } from "@/features/communities/types";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";

export const useCommunityEffect = (communityData: Community) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCommunityData(communityData));
    return () => {
      dispatch(resetCommunityData());
    };
  }, [communityData, dispatch]);
};
