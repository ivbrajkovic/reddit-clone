import { PostItemProps } from "@/features/posts/components/PostList/components/PostItem";
import { ActionIcon, Box, Flex, Text } from "@mantine/core";
import { FC, MouseEventHandler } from "react";
import {
  IoArrowDownCircle,
  IoArrowDownCircleOutline,
  IoArrowUpCircle,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

type VoteButtonsProps = Pick<PostItemProps, "userVoteValue" | "onVotePost">;

const VoteButtons: FC<VoteButtonsProps> = (props) => {
  const incrementVote: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    props.onVotePost(1);
  };

  const decrementVote: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    props.onVotePost(-1);
  };

  const upArrow =
    props.userVoteValue > 0 ? IoArrowUpCircle : IoArrowUpCircleOutline;
  const upArrowFill = props.userVoteValue > 0 ? "#FF4500" : "inherit";

  const downArrow =
    props.userVoteValue < 0 ? IoArrowDownCircle : IoArrowDownCircleOutline;
  const downArrowFill = props.userVoteValue > 0 ? "#7193FF" : "inherit";

  return (
    <Flex
      m={8}
      w="fit-content"
      direction="column"
      align="center"
      justify="center"
    >
      <ActionIcon onClick={incrementVote}>
        <Box component={upArrow} fontSize={24} fill={upArrowFill}></Box>
      </ActionIcon>
      <Box my={2}>
        {props.userVoteValue || (
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
