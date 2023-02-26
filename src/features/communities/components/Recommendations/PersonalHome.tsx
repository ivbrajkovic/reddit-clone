import { useCommunityCreateModal } from "@/features/communities/hooks/useCommunityCreateModal";
import { setDirectoryOpen } from "@/features/directory/directorySlice";
import { useAppDispatch } from "@/store/hooks";
import { Box, Button, Flex, Group, Paper, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { FC } from "react";
import { FaReddit } from "react-icons/fa";

type PersonalHomeProps = {};

const PersonalHome: FC<PersonalHomeProps> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { openCommunityCreateModal } = useCommunityCreateModal();

  const onCreatePost = () => {
    const { communityId } = router.query;
    communityId
      ? router.push(`/r/${communityId}/submit`)
      : dispatch(setDirectoryOpen(true));
  };

  return (
    <Paper withBorder shadow="lg" sx={{ overflow: "hidden" }}>
      <Group h={34} bg="url(/images/redditPersonalHome.png)" bgsz="cover" />
      <Box p={12}>
        <Group mb={4} spacing="xs">
          <Flex c="red">
            <FaReddit size={36} />
          </Flex>
          <Text fw={600}>Home</Text>
        </Group>
        <Stack spacing="xs">
          <Text fz="9pt">Your personal Reddit frontpage, built for you.</Text>
          <Button h={30} w="100%" onClick={onCreatePost}>
            Create Post
          </Button>
          <Button
            h={30}
            w="100%"
            variant="outline"
            onClick={openCommunityCreateModal}
          >
            Create Community
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};
export default PersonalHome;
