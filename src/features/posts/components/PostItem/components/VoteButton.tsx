import { useVotePost } from "@/features/posts/hooks/useVotePost";
import { Post, PostVote } from "@/features/posts/types";
import { stopPropagation } from "@/utility";
import { ActionIcon, Box, Flex, Group, Text } from "@mantine/core";
import { FC } from "react";
import {
  IoArrowDownCircle,
  IoArrowDownCircleOutline,
  IoArrowUpCircle,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

type VoteButtonsProps = {
  post: Post;
  postVote?: PostVote;
};

const VoteButtons: FC<VoteButtonsProps> = (props) => {
  const { incrementVote, decrementVote } = useVotePost();

  const onIncrementVote = () => incrementVote(props.post);
  const onDecrementVote = () => decrementVote(props.post);

  const isPositiveVote = (props.postVote?.voteValue ?? 0) > 0;
  const isNegativeVote = (props.postVote?.voteValue ?? 0) < 0;

  const upArrow = isPositiveVote ? IoArrowUpCircle : IoArrowUpCircleOutline;
  const upArrowFill = isPositiveVote ? "#FF4500" : "inherit";

  const downArrow = isNegativeVote
    ? IoArrowDownCircle
    : IoArrowDownCircleOutline;
  const downArrowFill = isNegativeVote ? "#7193FF" : "inherit";

  return (
    <Flex
      m={8}
      w="fit-content"
      direction="column"
      align="center"
      justify="center"
      onClick={stopPropagation}
    >
      <ActionIcon onClick={onIncrementVote}>
        <Box component={upArrow} fontSize={24} fill={upArrowFill}></Box>
      </ActionIcon>
      <Group h={24}>
        <Text fz="xs" fw="bolder">
          {props.post.voteStatus || "Vote"}
        </Text>
      </Group>
      <ActionIcon onClick={onDecrementVote}>
        <Box component={downArrow} fontSize={24} fill={downArrowFill}></Box>
      </ActionIcon>
    </Flex>
  );
};

export default VoteButtons;
