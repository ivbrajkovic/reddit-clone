import { useAuthModal } from "@/features/auth/hooks/useAuthModal";
import { useRenderCount } from "@/hooks/useRenderCount";
import { Button, Flex } from "@mantine/core";
import { FC } from "react";

const AuthButtons: FC = () => {
  useRenderCount("AuthButtons");
  const { openLoginModal, openSignupModal } = useAuthModal();
  return (
    <Flex gap={8} align="center">
      <Button
        variant="outline"
        h="28px"
        display={{ base: "none", md: "unset" }}
        onClick={openLoginModal}
      >
        Log In
      </Button>
      <Button
        variant="filled"
        h="28px"
        display={{ base: "none", md: "unset" }}
        onClick={openSignupModal}
      >
        Sign Up
      </Button>
    </Flex>
  );
};
export default AuthButtons;
