import {
  Box,
  CloseButton,
  Modal as MantineModal,
  useMantineTheme,
} from "@mantine/core";
import { ComponentProps, FC, ReactNode } from "react";

type MantineModalProps = Omit<ComponentProps<typeof MantineModal>, "opened">;

type ModalProps = MantineModalProps & {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, ...rest }) => {
  const theme = useMantineTheme();
  return (
    <MantineModal
      {...rest}
      centered
      opened={isOpen}
      onClose={onClose}
      withCloseButton={false}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      <>
        <Box pos="absolute" top={16} right={16}>
          <CloseButton size="lg" onClick={onClose} />
        </Box>
        {children}
      </>
    </MantineModal>
  );
};

export default Modal;
