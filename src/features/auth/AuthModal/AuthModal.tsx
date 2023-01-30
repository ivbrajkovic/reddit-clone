import { Modal } from "@/components/Modal";
import Login from "@/features/auth/AuthModal/components/Login";
import OAuthButtons from "@/features/auth/AuthModal/components/OAuthButtons";
import { ResetPassword } from "@/features/auth/AuthModal/components/ResetPassword";
import SignUp from "@/features/auth/AuthModal/components/SignUp";
import { selectModalView } from "@/features/auth/authSlice";
import { useCloseModalOnAuth } from "@/features/auth/hooks/useCloseModalOnAuth";
import { useAppSelector } from "@/store/hooks";
import { Box, Text } from "@mantine/core";

const formatTitle = (view: string) => {
  if (view === "login") return "Login";
  if (view === "signup") return "Sign Up";
  if (view === "resetPassword") return "Reset Password";
  return null;
};

const Or = () => (
  <Text mb={8} ta="center" fw={700} color="gray.6">
    OR
  </Text>
);

const AuthModal = () => {
  const view = useAppSelector(selectModalView);
  useCloseModalOnAuth();

  const title = formatTitle(view);
  return (
    <Modal>
      <Text mb={14} fz="lg" fw="bold" ta="center">
        {title}
      </Text>
      <Box w="70%" mx="auto">
        {view !== "resetPassword" ? <OAuthButtons /> : null}
        {view !== "resetPassword" ? <Or /> : null}
        {view === "login" ? <Login /> : null}
        {view === "signup" ? <SignUp /> : null}
        {view === "resetPassword" ? <ResetPassword /> : null}
      </Box>
    </Modal>
  );
};

export default AuthModal;
