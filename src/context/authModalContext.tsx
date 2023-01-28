import {
  AuthModalMachine,
  authModalMachine,
} from "@/machines/authModalMachine";
import { useInterpret } from "@xstate/react";
import { createContext, FC, ReactNode, useContext } from "react";

import { InterpreterFrom } from "xstate";

const authModalContext =
  createContext<InterpreterFrom<AuthModalMachine> | null>(null);
authModalContext.displayName = authModalMachine.id;

export const AuthModalMachineProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const service = useInterpret(authModalMachine, { devTools: true });
  return (
    <authModalContext.Provider value={service}>
      {children}
    </authModalContext.Provider>
  );
};

export const useAuthModalContext = () => {
  const service = useContext(authModalContext);
  if (!service) {
    throw new Error(
      `use${authModalMachine.id}Service must be used inside ${authModalMachine.id}Provider`,
    );
  }
  return service;
};
