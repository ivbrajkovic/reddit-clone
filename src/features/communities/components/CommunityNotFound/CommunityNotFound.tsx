import { Button, Flex, Text } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";

type CommunityNotFoundProps = {};

const CommunityNotFound: FC<CommunityNotFoundProps> = () => {
  return (
    <Flex direction="column" justify="center" align="center" mih="60vh">
      <Text mb="lg" fz="xl" fw="400">
        Sorry, that community does not exist or has been renamed
      </Text>
      <Button component={Link} href="/">
        Go Home
      </Button>
    </Flex>
  );
};
export default CommunityNotFound;
