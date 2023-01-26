import { authModalState } from "@/atoms/authModalAtom";
import Login from "@/components/Modal/Auth/Login";
import SignUp from "@/components/Modal/Auth/SignUp";
import { Flex } from "@mantine/core";
import { FC } from "react";
import { useRecoilValue } from "recoil";

type AuthInputsProps = {};

const AuthInputs: FC<AuthInputsProps> = () => {
  const modalState = useRecoilValue(authModalState);
  return (
    <Flex direction="column" align="center" w="100%" mt={16}>
      {modalState.view === "login" ? (
        <Login />
      ) : modalState.view === "signup" ? (
        <SignUp />
      ) : null}
    </Flex>
  );
};
export default AuthInputs;
