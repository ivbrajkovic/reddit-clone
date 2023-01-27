import { useAuthModalContext } from "@/context/authModalContext";
import { AuthModalMachineState } from "@/machines/authModalMachine";
import { useSelector } from "@xstate/react";
import { useCallback } from "react";

const isAuthModalOpenSelector = (state: AuthModalMachineState) =>
  state.matches("opened");

export const useAuthModal = () => {
  const service = useAuthModalContext();
  const isOpen = useSelector(service, isAuthModalOpenSelector);

  const { send } = service;
  const { view } = service.getSnapshot().context;

  const closeModal = useCallback(() => send("CLOSE_MODAL"), [send]);

  return { isOpen, view, closeModal };
};
