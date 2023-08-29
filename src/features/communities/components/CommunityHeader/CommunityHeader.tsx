import { selectCommunityData } from "@/features/communities/communitySlice";
import { CommunityJoinButton } from "@/features/communities/components/CommunityJoinButton";
import { Box, Container, createStyles, Flex, Image, Text } from "@mantine/core";
import { FaReddit } from "react-icons/fa";
import { useSelector } from "react-redux";

const useStyles = createStyles((theme) => ({
  header: {
    height: 158,

    "& > div:first-child": {
      height: "50%",
      backgroundColor:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
    },

    "& > div:first-child + div": {
      height: "50%",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[5] : "white",
      // paddingInline: 24,
    },
  },
  imageContainer: {
    overflow: "hidden",
    marginTop: -12,
    width: 72,
    height: 72,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    fontSize: 72,
    color: theme.colors.blue[4],

    borderRadius: "50%",
    border: `4px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : "white"
    }`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[4] : "white",
  },
}));

const CommunityHeader = () => {
  const { classes } = useStyles();
  const communityData = useSelector(selectCommunityData);

  return (
    <div className={classes.header}>
      <div></div>
      <div>
        <Container display="flex">
          <Box className={classes.imageContainer}>
            {communityData.imageUrl ? (
              <Image
                src={communityData.imageUrl}
                alt="Community image"
                fit="cover"
                width={72}
                height={72}
              />
            ) : (
              <FaReddit />
            )}
          </Box>
          <Flex p="10px 16px">
            <Box mr={24}>
              <Text fw="700" fz="16pt" lh={1}>
                {communityData.communityId}
              </Text>
              <Text fw="500" fz="10pt" c="gray.5">
                {communityData.communityId}
              </Text>
            </Box>
            <CommunityJoinButton h={30} px={24} />
          </Flex>
        </Container>
      </div>
    </div>
  );
};
export default CommunityHeader;
