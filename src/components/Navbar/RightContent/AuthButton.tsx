import { useAuthModalHandlers } from "@/features/auth/hooks/useAuthModalHandlers";
import { Button, Flex } from "@mantine/core";
import { FC } from "react";

const AuthButtons: FC = () => {
  const { openLogin, openSignup } = useAuthModalHandlers();
  return (
    <Flex gap={8} align="center">
      <Button
        variant="outline"
        h="28px"
        display={{ base: "none", md: "unset" }}
        onClick={openLogin}
      >
        Log In
      </Button>
      <Button
        variant="filled"
        h="28px"
        display={{ base: "none", md: "unset" }}
        onClick={openSignup}
      >
        Sign Up
      </Button>
    </Flex>
  );
};
export default AuthButtons;
