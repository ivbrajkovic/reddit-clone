import { useAuthModalOpen } from "@/components/Modal/AuthModal/hooks/useAuthModalOpen";
import { useRenderCount } from "@/hooks/useRenderCount";
import { Modal as MantineModal, Text, useMantineTheme } from "@mantine/core";
import { FC, ReactNode } from "react";

type ModalProps = {
  title: string | null;
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ title, children }) => {
  useRenderCount("AuthModal");
  const theme = useMantineTheme();
  const { isOpen, closeModal } = useAuthModalOpen();

  return (
    <MantineModal
      centered
      opened={isOpen}
      onClose={closeModal}
      // withCloseButton={false}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      title={
        <Text fz="lg" fw="bold" ta="center">
          {title}
        </Text>
      }
      styles={{ title: { width: "100%" } }}
    >
      {children}
    </MantineModal>
  );
};

export default Modal;
