import { CommunityLogo } from "@/components/CommunityLogo";
import { DirectoryItemProps } from "@/features/directory/directorySlice";
import { Box, Flex, Text } from "@mantine/core";
import { FC } from "react";

const DirectoryHeader: FC<DirectoryItemProps> = ({ url, ...rest }) => {
  return (
    <Flex gap="sm" align="center">
      <CommunityLogo {...rest} />
      <Box w={200} display={{ base: "none", md: "block" }}>
        <Text size="sm">{url ?? "Home"}</Text>
      </Box>
    </Flex>
  );
};

export default DirectoryHeader;
