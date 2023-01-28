import { useAuthModalContext } from "@/context/authModalContext";
import { AuthModalMachineState } from "@/machines/authModalMachine";
import { useSelector } from "@xstate/react";

const selectView = (state: AuthModalMachineState) => state.context.view;

export const useAuthModalView = () => {
  const service = useAuthModalContext();
  const view = useSelector(service, selectView);
  return { view };
};
