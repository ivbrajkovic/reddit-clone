import {
  closeCommunityCreateModal,
  openCommunityCreateModal,
} from "@/features/communities/communitySlice";
import { useAppDispatch } from "@/store/hooks";
import { useMemo } from "react";

export const useCommunityCreateModal = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      openCommunityCreateModal: () => dispatch(openCommunityCreateModal()),
      closeCommunityCreateModal: () => dispatch(closeCommunityCreateModal()),
    }),
    [dispatch],
  );
};
