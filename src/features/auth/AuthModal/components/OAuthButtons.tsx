import { useAuthErrorEffect } from "@/features/auth/hooks/useAuthErrorEffect";
import { auth } from "@/firebase/clientApp";
import { Button, Image } from "@mantine/core";
import { FC } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

type OAuthButtonsProps = {};

const OAuthButtons: FC<OAuthButtonsProps> = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  useAuthErrorEffect(error);

  return (
    <>
      <Button
        mb={8}
        w="100%"
        variant="oauth"
        leftIcon={
          <Image
            width={16}
            height={16}
            src="/images/googlelogo.png"
            alt="google"
          />
        }
        loading={loading}
        loaderProps={{ color: "grey" }}
        onClick={() => signInWithGoogle()}
      >
        Continue with Google
      </Button>
      <Button
        mb={8}
        w="100%"
        variant="oauth"
        disabled={loading}
        loaderProps={{ color: "grey" }}
      >
        Some Other Provider
      </Button>
    </>
  );
};
export default OAuthButtons;
