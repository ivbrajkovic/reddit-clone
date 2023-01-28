import { useAuthModalContext } from "@/context/authModalContext";
import { AuthModalMachineState } from "@/machines/authModalMachine";
import { useSelector } from "@xstate/react";
import { useCallback } from "react";

const selectIsOpen = (state: AuthModalMachineState) => state.matches("open");
const selectView = (state: AuthModalMachineState) => state.context.view;

export const useAuthModalOpen = () => {
  const service = useAuthModalContext();
  const view = useSelector(service, selectView);
  const isOpen = useSelector(service, selectIsOpen);
  const closeModal = useCallback(() => service.send("CLOSE_MODAL"), [service]);
  return { isOpen, closeModal, view };
};
