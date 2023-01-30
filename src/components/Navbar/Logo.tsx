import { Flex, Image } from "@mantine/core";
import React from "react";

const Logo: React.FC = () => (
  <Flex gap={2} align="center">
    <Image
      src="/images/redditFace.svg"
      height={30}
      width={30}
      alt="reddit-logo"
    />
    <Image
      src="/images/redditText.svg"
      height={46}
      width="auto"
      alt="reddit-text"
      display={{ base: "none", md: "unset" }}
    />
  </Flex>
);

export default Logo;
