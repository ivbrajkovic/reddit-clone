import { Button } from "@mantine/core";
import { FC } from "react";

type OAuthButtonsProps = {};

const OAuthButtons: FC<OAuthButtonsProps> = () => {
  return (
    <>
      <Button mb={8} w="100%" variant="oauth">
        Continue with Google
      </Button>
      <Button mb={34} w="100%" variant="oauth">
        Some Other Provider
      </Button>
    </>
  );
};
export default OAuthButtons;
