import { useAuthModalContext } from "@/context/authModalContext";
import { useRenderCount } from "@/hooks/useRenderCount";
import { Button } from "@mantine/core";
import { FC } from "react";

const AuthButtons: FC = () => {
  useRenderCount("AuthButtons");

  const { send } = useAuthModalContext();
  return (
    <>
      <Button
        variant="outline"
        h="28px"
        mr={8}
        display={{ base: "none", md: "unset" }}
        onClick={() => send("OPEN_LOGIN_MODAL")}
      >
        Log In
      </Button>
      <Button
        variant="filled"
        h="28px"
        display={{ base: "none", md: "unset" }}
        onClick={() => send("OPEN_SIGNUP_MODAL")}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButtons;
