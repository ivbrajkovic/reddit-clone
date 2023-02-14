import { PostItemProps } from "@/features/posts/components/PostItem/PostItem";
import { ActionIcon, Flex, Text } from "@mantine/core";
import { FC } from "react";
import { RxThickArrowDown, RxThickArrowUp } from "react-icons/rx";

type VoteButtonsProps = Pick<PostItemProps, "userVoteValue" | "onVote">;

const VoteButtons: FC<VoteButtonsProps> = (props) => {
  const incrementVote = () => props.onVote(1);
  const decrementVote = () => props.onVote(-1);
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="fit-content"
      my={8}
      mx={8}
    >
      <ActionIcon>
        <RxThickArrowUp fontSize={24} onClick={incrementVote} />
      </ActionIcon>
      {props.userVoteValue ?? (
        <Text fz="sm" fw="bolder">
          Vote
        </Text>
      )}
      <ActionIcon>
        <RxThickArrowDown fontSize={24} onClick={decrementVote} />
      </ActionIcon>
    </Flex>
  );
};

export default VoteButtons;
