import { usePostItemContext } from "@/features/posts/components/PostItem/components/postItemContext";
import { stopPropagation } from "@/utility";
import { ActionIcon, Box, Flex, Text } from "@mantine/core";
import { MouseEventHandler } from "react";
import {
  IoArrowDownCircle,
  IoArrowDownCircleOutline,
  IoArrowUpCircle,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

const VoteButtons = () => {
  const { userVoteValue, onVotePost } = usePostItemContext();

  const incrementVote: MouseEventHandler<HTMLButtonElement> = (e) =>
    onVotePost(1);

  const decrementVote: MouseEventHandler<HTMLButtonElement> = (e) =>
    onVotePost(-1);

  const upArrow = userVoteValue > 0 ? IoArrowUpCircle : IoArrowUpCircleOutline;
  const upArrowFill = userVoteValue > 0 ? "#FF4500" : "inherit";

  const downArrow =
    userVoteValue < 0 ? IoArrowDownCircle : IoArrowDownCircleOutline;
  const downArrowFill = userVoteValue > 0 ? "#7193FF" : "inherit";

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
      <Box my={2}>
        {userVoteValue || (
          <Text fz="xs" fw="bolder">
            Vote
          </Text>
        )}
      </Box>
      <ActionIcon onClick={decrementVote}>
        <Box component={downArrow} fontSize={24} fill={downArrowFill}></Box>
      </ActionIcon>
    </Flex>
  );
};

export default VoteButtons;
