import AuthInputs from "@/components/Modal/Auth/AuthInputs";
import { useAuthModal } from "@/components/Modal/Auth/hooks/useAuthModal";
import { useRenderCount } from "@/hooks/useRenderCount";
import { AuthModalMachineState } from "@/machines/authModalMachine";
import { Flex, Modal, Text, useMantineTheme } from "@mantine/core";

const isAuthModalOpenSelector = (state: AuthModalMachineState) =>
  state.matches("opened");

const AuthModal = () => {
  useRenderCount("AuthModal");

  const theme = useMantineTheme();
  const { isOpen, view, closeModal } = useAuthModal();

  const title =
    view === "login"
      ? "Login"
      : view === "signup"
      ? "Sign Up"
      : "Forgot Password";

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      title={
        <Text fw={700} tt="capitalize">
          {title}
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
