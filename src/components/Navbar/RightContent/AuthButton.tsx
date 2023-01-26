import { useSetAuthModalState } from "@/hooks/useAuthModal";
import { Button } from "@mantine/core";
import { FC } from "react";

const AuthButtons: FC = () => {
  const { toggleLoginModal } = useSetAuthModalState();
  return (
    <>
      <Button
        variant="outline"
        h="28px"
        mr={8}
        display={{ base: "none", md: "unset" }}
        onClick={toggleLoginModal}
      >
        Log In
      </Button>
      <Button
        variant="filled"
        h="28px"
        display={{ base: "none", md: "unset" }}
        onClick={toggleLoginModal}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButtons;
