import { closeAuthModal, openAuthModal } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useMemo } from "react";

export const useAuthModalHandlers = () => {
  const dispatch = useAppDispatch();
  return useMemo(
    () => ({
      closeModal: () => dispatch(closeAuthModal()),
      openLogin: () => dispatch(openAuthModal("login")),
      openSignup: () => dispatch(openAuthModal("signup")),
      openResetPassword: () => dispatch(openAuthModal("resetPassword")),
    }),
    [dispatch],
  );
};
