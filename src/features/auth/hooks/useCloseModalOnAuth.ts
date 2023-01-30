import { useAuthModal } from "@/features/auth/hooks/useAuthModal";
import { useSignedInUser } from "@/hooks/useIsUserSignedIn";
import { useEffect } from "react";

export const useCloseModalOnAuth = () => {
  const user = useSignedInUser();
  const { closeModal } = useAuthModal();
  useEffect(() => {
    user && closeModal();
  }, [user, closeModal]);
  return { closeModal };
};
