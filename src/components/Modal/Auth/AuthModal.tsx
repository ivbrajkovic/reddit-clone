import AuthInputs from "@/components/Modal/Auth/AuthInputs";
import { useAuthModalActor } from "@/hooks/useAuthModalActor";
import { useRenderCount } from "@/hooks/useRenderCount";
import { Flex, Modal, Text, useMantineTheme } from "@mantine/core";

const AuthModal = () => {
  useRenderCount("AuthModal");

  const theme = useMantineTheme();
  const [state, setState] = useAuthModalActor();
  const { view } = state.context;

  const title =
    view === "login"
      ? "Login"
      : view === "signup"
      ? "Sign Up"
      : "Forgot Password";

  const isOpen = state.matches("opened");
  const toggleModal = () => setState("CLOSE_MODAL");

  return (
    <Modal
      opened={isOpen}
      onClose={toggleModal}
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
