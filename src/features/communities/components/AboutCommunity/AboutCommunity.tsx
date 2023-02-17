import { HEADER_HEIGHT } from "@/constants";
import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import AboutCommunityAdmin from "@/features/communities/components/AboutCommunity/components/AboutComunityAdmin";
import { useCommunityData } from "@/features/communities/hooks/useCommunityData";
import {
  Box,
  Button,
  createStyles,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { BsThreeDots } from "react-icons/bs";
import { RiCakeLine } from "react-icons/ri";

const PADDING_TOP = HEADER_HEIGHT + 16;

const useStyles = createStyles((theme) => ({
  paper: {
    top: PADDING_TOP,
    position: "sticky",
    overflow: "hidden",
  },
  header: {
    padding: theme.spacing.xs,
    color: theme.white,
    backgroundColor:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },
  menuTrigger: {
    paddingInline: 6,
    paddingBlock: 4,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
    "&:hover": {
      backgroundColor:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 7],
    },
  },
}));

type AboutCommunityProps = {};

const AboutCommunity: FC<AboutCommunityProps> = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const user = useSignedInUser();
  const { membersCount, createdAt, creatorId, imageUrl } = useCommunityData();
  const membersCountFormatted = membersCount.toLocaleString();
  const createdAtFormatted = dayjs(createdAt.seconds * 1000).format(
    "MMM DD, YYYY",
  );
  return (
    <Paper withBorder shadow="lg" className={classes.paper}>
      <Group mb="sm" position="apart" className={classes.header}>
        <Text fz="sm" fw="600">
          About Community
        </Text>
        <UnstyledButton
          title="About community menu"
          className={classes.menuTrigger}
        >
          <BsThreeDots color="white" />
        </UnstyledButton>
      </Group>

      <Stack mb="md" px="xs">
        <Group position="apart">
          <Box>
            <Text fw={700}>{membersCountFormatted}</Text>
            <Text fz="10pt">Members</Text>
          </Box>
          <Box>
            <Text fw={700}>1</Text>
            <Text fz="10pt">Online</Text>
          </Box>
          <Box />
          <Box />
        </Group>

        <Divider />

        <Group spacing="sm">
          <RiCakeLine />
          <Text fz="10pt">Created {createdAtFormatted}</Text>
        </Group>

        <Button
          component={Link}
          href={`/r/${router.query.communityId}/submit`}
          h={30}
        >
          Create post
        </Button>

        <Divider />

        <AboutCommunityAdmin
          isVisible={user?.uid === creatorId}
          imageUrl={imageUrl}
        />
      </Stack>
    </Paper>
  );
};
export default AboutCommunity;
