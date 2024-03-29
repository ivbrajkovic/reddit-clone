import AuthButtons from "@/components/Navbar/RightContent/AuthButton";
import UserLinks from "@/components/Navbar/RightContent/UserLinks";
import UserMenu from "@/components/Navbar/UserMenu/UserMenu";
import { useUser } from "@/features/auth/hooks/useSignedInUser";
import { Flex } from "@mantine/core";

const UserActions = () => (useUser() ? <UserLinks /> : <AuthButtons />);
const RightContent = () => (
  <Flex gap={8}>
    <UserActions />
    <UserMenu />
  </Flex>
);

export default RightContent;
