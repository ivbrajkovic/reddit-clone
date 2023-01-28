import Inputs from "@/components/Modal/AuthModal/components/Inputs";
import Modal from "@/components/Modal/AuthModal/components/Modal";
import OAuthButtons from "@/components/Modal/AuthModal/components/OAuthButtons";
import { useAuthModalOpen } from "@/components/Modal/AuthModal/hooks/useAuthModalOpen";
import { useRenderCount } from "@/hooks/useRenderCount";
import { AuthModalContext } from "@/machines/authModalMachine";
import { Box } from "@mantine/core";

const formatTitle = (view: AuthModalContext["view"]) => {
  if (view === "login") return "Login";
  if (view === "signup") return "Sign Up";
  if (view === "resetPassword") return "Reset Password";
  return null;
};

const AuthModal = () => {
  useRenderCount("AuthModal");
  const { isOpen, closeModal, view } = useAuthModalOpen();

  const title = formatTitle(view);

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={title}>
      <Box w="70%" mx="auto">
        <OAuthButtons />
        <Inputs view={view} />
        {/* <ResetPassword /> */}
      </Box>
    </Modal>
  );
};

export default AuthModal;
