import FooterButton from "@/features/posts/components/PostItem/FooterButton";
import VoteButtons from "@/features/posts/components/PostItem/VoteButton";
import { Post } from "@/features/posts/types";
import { Box, createStyles, Flex, Group, Paper } from "@mantine/core";
import { FC } from "react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineGift } from "react-icons/hi";
import { IoBookmarkOutline } from "react-icons/io5";

import { RiShareForwardLine } from "react-icons/ri";
import { VscComment } from "react-icons/vsc";

const useStyles = createStyles((theme) => ({
  leftColumn: {
    alignItems: "center",
  },
  voteButtons: {},
}));

export type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (value: number) => void;
  onDeletePost: () => void;
  onSelectPost: () => void;
};

const PostItem: FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  const { classes } = useStyles();
  return (
    <Paper shadow="lg">
      <Flex align="flex-start">
        <Box>
          <VoteButtons userVoteValue={userVoteValue} onVote={onVote} />
        </Box>
        <Box pt={8}>
          <Group spacing="sm">
            <div>pic</div>
            <div>communityId</div>
            <div>creator</div>
            <div>time</div>
          </Group>
          <div>Title</div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
            sapiente velit excepturi labore at ut quia voluptates quis ipsam
            cupiditate, modi molestiae, dolorum recusandae. Aspernatur tempore
            voluptatem quo aut dolorum.
          </div>
          <Group spacing={4} pb={2}>
            <FooterButton
              title="Comments"
              icon={<VscComment fontSize={24} />}
            />
            <FooterButton
              title="Awards"
              icon={<HiOutlineGift fontSize={24} />}
            />
            <FooterButton
              title="Share"
              icon={<RiShareForwardLine fontSize={24} />}
            />
            <FooterButton
              title="Save"
              icon={<IoBookmarkOutline fontSize={24} />}
            />
            <FooterButton icon={<BsThreeDots fontSize={24} />} py={0} />
          </Group>
        </Box>
      </Flex>
    </Paper>
  );
};
export default PostItem;
