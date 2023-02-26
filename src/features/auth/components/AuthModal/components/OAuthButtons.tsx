import { showNotificationError } from "@/common/showNotificationError";
import { useAuthErrorEffect } from "@/features/auth/hooks/useAuthErrorEffect";
import { createUserInFirestore } from "@/features/auth/utility/utility";
import { auth } from "@/firebase/clientApp";
import { Button, Image } from "@mantine/core";
import { FC } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

type OAuthButtonsProps = {};

const OAuthButtons: FC<OAuthButtonsProps> = () => {
  const [signInWithGoogle, _user, loading, error] = useSignInWithGoogle(auth);
  useAuthErrorEffect(error);

  const signIn = () =>
    signInWithGoogle()
      .then(createUserInFirestore)
      .catch(showNotificationError("Error creating user"));

  return (
    <>
      <Button
        mb={8}
        w="100%"
        // @ts-ignore
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
        onClick={signIn}
      >
        Continue with Google
      </Button>
      <Button
        mb={8}
        w="100%"
        // @ts-ignore
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
