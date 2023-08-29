import { selectAuthModalIsOpen } from "@/features/auth/authSlice";
import { useAuthModalHandlers } from "@/features/auth/hooks/useAuthModalHandlers";
import { useUser } from "@/features/auth/hooks/useSignedInUser";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export const useAuthModal = () => {
  const user = useUser();
  const isOpen = useAppSelector(selectAuthModalIsOpen);
  const { closeModal } = useAuthModalHandlers();
  useEffect(() => {
    user && closeModal();
  }, [user, closeModal]);
  return { isOpen, closeModal };
};
