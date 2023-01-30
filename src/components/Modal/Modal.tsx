import { useRenderCount } from "@/hooks/useRenderCount";
import {
  Box,
  CloseButton,
  Modal as MantineModal,
  useMantineTheme,
} from "@mantine/core";
import { FC, ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useRenderCount("Modal");

  const theme = useMantineTheme();
  // const dispatch = useAppDispatch();
  // const { isOpen } = useAppSelector(selectModalState);

  // const close = () => dispatch(closeModal());

  return (
    <MantineModal
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
          <CloseButton onClick={onClose} />
        </Box>
        {children}
      </>
    </MantineModal>
  );
};

export default Modal;
