import { useAuthModalContext } from "@/context/authModalContext";
import { AuthModalMachineState } from "@/machines/authModalMachine";
import { useSelector } from "@xstate/react";
import { useCallback } from "react";

const selectIsOpen = (state: AuthModalMachineState) => state.matches("open");

export const useAuthModalOpen = () => {
  const service = useAuthModalContext();
  const isOpen = useSelector(service, selectIsOpen);
  const closeModal = useCallback(() => service.send("CLOSE_MODAL"), [service]);
  return { isOpen, closeModal };
};
