import { HEADER_HEIGHT } from "@/constants";
import CommunityAboutAdmin from "@/features/communities/components/CommunityAbout/components/CommunityAboutAdmin";
import { CommunityAboutLoader } from "@/features/communities/components/CommunityAboutLoader";
import { CommunityNotFound } from "@/features/communities/components/CommunityNotFound";
import { Community } from "@/features/communities/types";
import { useIsCreator } from "@/features/posts/hooks/useIsModerator";
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
import { FC } from "react";
import { BsThreeDots } from "react-icons/bs";
import { RiCakeLine } from "react-icons/ri";

const PADDING_TOP = HEADER_HEIGHT + 24;

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

type CommunityAboutProps = {
  isLoading?: boolean;
  communityData: Community;
};

const CommunityAbout: FC<CommunityAboutProps> = ({
  isLoading,
  communityData,
}) => {
  const { classes } = useStyles();
  const isModerator = useIsCreator(communityData.creatorId);

  if (isLoading) return <CommunityAboutLoader />;
  if (!communityData) return <CommunityNotFound />;

  const { communityId, membersCount, createdAt, imageUrl } = communityData;
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

        <Button component={Link} href={`/r/${communityId}/submit`} h={30}>
          Create post
        </Button>

        <Divider />

        <CommunityAboutAdmin
          isVisible={isModerator}
          imageUrl={imageUrl}
          communityId={communityId as string}
        />
      </Stack>
    </Paper>
  );
};

export default CommunityAbout;
