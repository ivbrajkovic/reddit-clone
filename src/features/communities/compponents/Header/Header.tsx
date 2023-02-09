import { Community } from "@/features/communities/types";
import { Flex, Grid } from "@mantine/core";
import { FC } from "react";
("@mantine/core");

type HeaderProps = {
  communityData: Community;
};

const Header: FC<HeaderProps> = () => {
  return (
    <Grid grow h={146}>
      <Grid.Col bg="blue.4"></Grid.Col>
      <Grid.Col>
        {/* <Box> */}
        <Flex w="95%" maw={860} mx="auto" sx={{ border: "1px solid red" }}>
          tatatat
        </Flex>
        {/* </Box> */}
      </Grid.Col>
    </Grid>
  );
};
export default Header;
