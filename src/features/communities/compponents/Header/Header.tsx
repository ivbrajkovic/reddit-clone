import { JoinCommunityButton } from "@/features/communities/compponents/JoinCommunityButton";
import { useCommunityData } from "@/features/communities/hooks/useCommunityData";
import { Box, Container, createStyles, Flex, Image, Text } from "@mantine/core";
import { FaReddit } from "react-icons/fa";

const useStyles = createStyles((theme) => ({
  header: {
    height: 158,

    "& > div:first-child": {
      height: "50%",
      backgroundColor: theme.colors.blue[4],
    },

    "& > div:first-child + div": {
      height: "50%",
      backgroundColor: theme.white,
      // paddingInline: 24,
    },
  },
  logo: {
    marginTop: -12,
    fontSize: 72,
    color: theme.colors.blue[4],
    border: "4px solid white",
    borderRadius: "50%",
  },
}));

const Header = () => {
  const { classes } = useStyles();
  const communityData = useCommunityData();
  if (!communityData) return null;

  return (
    <div className={classes.header}>
      <div></div>
      <div>
        <Container px="xl" display="flex">
          {communityData.imageUrl ? (
            <Image src={""} alt="" />
          ) : (
            <FaReddit className={classes.logo} />
          )}
          <Flex p="10px 16px">
            <Box mr={24}>
              <Text fw="700" fz="16pt" lh={1}>
                {communityData.communityId}
              </Text>
              <Text fw="500" fz="10pt" c="gray.5">
                {communityData.communityId}
              </Text>
            </Box>
            <JoinCommunityButton h={30} px={24} />
          </Flex>
        </Container>
      </div>
    </div>
  );
};
export default Header;