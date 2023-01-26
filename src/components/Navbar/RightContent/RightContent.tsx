import AuthModal from "@/components/Modal/Auth/AuthModal";
import AuthButtons from "@/components/Navbar/RightContent/AuthButton";
import { Flex } from "@mantine/core";
import { FC } from "react";

type RightContentProps = {};

const RightContent: FC<RightContentProps> = () => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </>
  );
};
export default RightContent;
