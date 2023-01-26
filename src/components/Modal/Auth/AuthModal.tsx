import AuthInputs from "@/components/Modal/Auth/AuthInputs";
import { useAuthModalState } from "@/hooks/useAuthModal";
import { Flex, Modal, Text, useMantineTheme } from "@mantine/core";

const AuthModal = () => {
  const theme = useMantineTheme();
  const { modalState, toggleModal } = useAuthModalState();

  const modalTitle =
    modalState.view === "login"
      ? "Login"
      : modalState.view === "signup"
      ? "Sign Up"
      : "Forgot Password";

  return (
    <Modal
      opened={modalState.open}
      onClose={toggleModal}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      // withCloseButton={false}
      title={
        <Text fw={700} tt="capitalize">
          {modalTitle}
        </Text>
      }
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        sx={{ border: "1px solid red" }}
      >
        {/* <OauthButtons /> */}
        <AuthInputs />
        {/* <ResetPassword /> */}
      </Flex>
    </Modal>
  );
};

export default AuthModal;
