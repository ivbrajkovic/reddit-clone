import { openModal } from "@/components/Modal/modalSlice";
import { setModalView } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useMemo } from "react";

export const useAuthModal = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => {
    return {
      openLoginModal: () => {
        dispatch(openModal());
        dispatch(setModalView("login"));
      },
      openSignupModal: () => {
        dispatch(openModal());
        dispatch(setModalView("signup"));
      },
      openResetPasswordModal: () => {
        dispatch(openModal());
        dispatch(setModalView("resetPassword"));
      },
    };
  }, [dispatch]);
};
