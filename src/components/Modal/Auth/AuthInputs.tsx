import Login from "@/components/Modal/Auth/Login";
import SignUp from "@/components/Modal/Auth/SignUp";
import { useAuthModalContext } from "@/context/authModalContext";
import { useRenderCount } from "@/hooks/useRenderCount";
import { Flex } from "@mantine/core";
import { FC } from "react";

type AuthInputsProps = {};

const AuthInputs: FC<AuthInputsProps> = () => {
  useRenderCount("AuthInputs");

  const service = useAuthModalContext();
  const { view } = service.machine.context;

  return (
    <Flex direction="column" align="center" w="100%" mt={16}>
      {view === "login" ? <Login /> : view === "signup" ? <SignUp /> : null}
    </Flex>
  );
};
export default AuthInputs;
