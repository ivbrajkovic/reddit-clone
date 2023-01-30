import { closeModal } from "@/components/Modal/modalSlice";
import { useIsUserSignedIn } from "@/hooks/useIsUserSignedIn";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";

export const useCloseModalOnAuth = () => {
  const dispatch = useAppDispatch();
  const isSignedIn = useIsUserSignedIn();
  useEffect(() => {
    isSignedIn && dispatch(closeModal());
  }, [isSignedIn, dispatch]);
};
