import { useAuthModalContext } from "@/context/authModalContext";
import { useActor } from "@xstate/react";

export const useAuthModalActor = () => {
  const service = useAuthModalContext();
  return useActor(service);
};
