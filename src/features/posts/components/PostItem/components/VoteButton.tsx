import { usePostItemContext } from "@/features/posts/components/PostItem/hooks/usePostItemContext";
import { useVotePost } from "@/features/posts/hooks/useVotePost";
import { stopPropagation } from "@/utility";
import { ActionIcon, Box, Flex, Group, Text } from "@mantine/core";
import { MouseEventHandler } from "react";
import {
  IoArrowDownCircle,
  IoArrowDownCircleOutline,
  IoArrowUpCircle,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

const VoteButtons = () => {
  const post = usePostItemContext();
  const onVotePost = useVotePost();

  const incrementVote: MouseEventHandler<HTMLButtonElement> = (e) =>
    onVotePost(1, post);

  const decrementVote: MouseEventHandler<HTMLButtonElement> = (e) =>
    onVotePost(-1, post);

  const { voteStatus } = post;

  const upArrow = voteStatus > 0 ? IoArrowUpCircle : IoArrowUpCircleOutline;
  const upArrowFill = voteStatus > 0 ? "#FF4500" : "inherit";

  const downArrow =
    voteStatus < 0 ? IoArrowDownCircle : IoArrowDownCircleOutline;
  const downArrowFill = voteStatus > 0 ? "#7193FF" : "inherit";

  return (
    <Flex
      m={8}
      w="fit-content"
      direction="column"
      align="center"
      justify="center"
      onClick={stopPropagation}
    >
      <ActionIcon onClick={incrementVote}>
        <Box component={upArrow} fontSize={24} fill={upArrowFill}></Box>
      </ActionIcon>
      <Group h={24}>
        <Text fz="xs" fw="bolder">
          {voteStatus || "Vote"}
        </Text>
      </Group>
      <ActionIcon onClick={decrementVote}>
        <Box component={downArrow} fontSize={24} fill={downArrowFill}></Box>
      </ActionIcon>
    </Flex>
  );
};

export default VoteButtons;
