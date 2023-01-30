import {
  closeCreateCommunityModal,
  openCreateCommunityModal,
} from "@/features/communities/communitySlice";
import { useAppDispatch } from "@/store/hooks";
import { useMemo } from "react";

export const useCreateCommunityModal = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      openCreateCommunityModal: () => dispatch(openCreateCommunityModal()),
      closeCreateCommunityModal: () => dispatch(closeCreateCommunityModal()),
    }),
    [dispatch],
  );
};
