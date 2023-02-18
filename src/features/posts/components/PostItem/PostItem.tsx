import { Community } from "@/features/communities/types";
import PostItemBody from "@/features/posts/components/PostItem/components/PostItemBody";
import PostItemFooter from "@/features/posts/components/PostItem/components/PostItemFooter";
import PostItemHeader from "@/features/posts/components/PostItem/components/PostItemHeader";
import usePostItemStyles from "@/features/posts/components/PostItem/components/postItemStyles";
import VoteButtons from "@/features/posts/components/PostItem/components/VoteButton";
import { usePostContext } from "@/features/posts/context/PostContext";
import { selectIsLoadingPost } from "@/features/posts/postsSlice";
import { Post, PostVote } from "@/features/posts/types";
import { useAppSelector } from "@/store/hooks";
import { Box, Flex, LoadingOverlay, Paper, Stack } from "@mantine/core";
import { FC } from "react";

// const isEqual = (prevProps: PostItemProps, nextProps: PostItemProps) =>
//   prevProps.id === nextProps.id &&
//   prevProps.voteStatus === nextProps.voteStatus;

export type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  postVote: PostVote;
  community: Community;
};

const PostItem: FC<PostItemProps> = (props) => {
  const { classes } = usePostItemStyles();
  const { onSelectPost } = usePostContext();
  const isLoadingPost = useAppSelector(selectIsLoadingPost);

  const handleSelectPost = () => onSelectPost(props.post.id);

  return (
    <Box pos="relative">
      <Paper
        withBorder
        shadow="lg"
        className={classes.postItem}
        onClick={handleSelectPost}
      >
        <Flex>
          <Box className={classes.leftSide}>
            <VoteButtons post={props.post} postVote={props.postVote} />
          </Box>

          <Stack pt={8} pl={4} spacing={4} w="100%">
            <PostItemHeader post={props.post} />
            <PostItemBody post={props.post} />
            <PostItemFooter
              post={props.post}
              userIsCreator={props.userIsCreator}
            />
          </Stack>
        </Flex>
      </Paper>
      <LoadingOverlay
        visible={isLoadingPost}
        overlayBlur={2}
        transitionDuration={500}
      />
    </Box>
  );
};

PostItem.displayName = "PostItem";
export default PostItem;
