import { authModalState, AuthModalState } from "@/atoms/authModalAtom";
import { useCallback, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export const useAuthModalState = () => {
  const [state, setState] = useRecoilState(authModalState);

  const toggleModal = useCallback(() => {
    setState((prev) => ({ ...prev, open: !prev.open }));
  }, [setState]);

  return { modalState: state, setModalState: setState, setState, toggleModal };
};

export const useSetAuthModalState = () => {
  const setState = useSetRecoilState(authModalState);

  const handlers = useMemo(() => {
    const toggleModal = (view: AuthModalState["view"]) =>
      setState((prev) => ({ ...prev, open: !prev.open, view }));

    const toggleLoginModal = () => toggleModal("login");
    const toggleSignupModal = () => toggleModal("signup");
    const toggleResetPasswordModal = () => toggleModal("resetPassword");

    return { toggleLoginModal, toggleSignupModal, toggleResetPasswordModal };
  }, [setState]);

  return handlers;
};
