import { Box, Flex } from "@mantine/core";
import React from "react";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Flex bg="gray.0">
      <Box>Logo</Box>
      <div>Logo</div>
    </Flex>
  );
};
export default Navbar;
