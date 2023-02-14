import { Post } from "@/features/posts/types";
import { ActionIcon, createStyles, Flex, Grid, Paper } from "@mantine/core";
import { FC } from "react";

import { RxThickArrowDown, RxThickArrowUp } from "react-icons/rx";

const useStyles = createStyles((theme) => ({
  voteButtons: {},
}));

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (value: number) => void;
  onDeletePost: () => void;
  onSelectPost: () => void;
};

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
      p={4}
    >
      <ActionIcon>
        <RxThickArrowUp fontSize={24} onClick={incrementVote} />
      </ActionIcon>
      {props.userVoteValue ?? 0}
      <ActionIcon>
        <RxThickArrowDown fontSize={24} onClick={incrementVote} />
      </ActionIcon>
    </Flex>
  );
};

const PostItem: FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  return (
    <Paper shadow="lg">
      <Grid>
        <Grid.Col span={1} style={{ background: "#ffff0050" }}>
          <VoteButtons userVoteValue={userVoteValue} onVote={onVote} />
        </Grid.Col>
        <Grid.Col span={11} style={{ background: "#ff000050" }}></Grid.Col>
      </Grid>
    </Paper>
  );
};
export default PostItem;
