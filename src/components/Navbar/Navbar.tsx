import Logo from "@/components/Navbar/RightContent/Logo";
import RightContent from "@/components/Navbar/RightContent/RightContent";
import SearchInput from "@/components/Navbar/SearchInput";
import { Flex } from "@mantine/core";

export const Navbar = () => {
  return (
    <Flex p="6px 12px" bg="gray.0" align="center" gap="sm">
      <Logo />
      <SearchInput />
      <RightContent />
    </Flex>
  );
};
