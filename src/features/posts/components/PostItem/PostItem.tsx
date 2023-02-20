import PostItemBody from "@/features/posts/components/PostItem/components/PostItemBody";
import PostItemFooter from "@/features/posts/components/PostItem/components/PostItemFooter";
import PostItemHeader from "@/features/posts/components/PostItem/components/PostItemHeader";
import usePostItemStyles from "@/features/posts/components/PostItem/components/postItemStyles";
import VoteButtons from "@/features/posts/components/PostItem/components/VoteButton";
import { usePostContext } from "@/features/posts/context/postContext";
import { Post, PostVote } from "@/features/posts/types";
import { Box, Flex, LoadingOverlay, Paper, Stack } from "@mantine/core";
import { andThen, pipe, tap } from "ramda";
import { FC, memo, useReducer } from "react";

const isEqual = (prevProps: PostItemProps, nextProps: PostItemProps) =>
  prevProps.post.id === nextProps.post.id &&
  prevProps.postVote.voteValue === nextProps.postVote.voteValue;

export type PostItemProps = {
  isSelectable?: boolean;
  post: Post;
  postVote: PostVote;
};

const PostItem: FC<PostItemProps> = memo(
  ({ isSelectable = true, ...props }) => {
    const { classes } = usePostItemStyles({ isSelectable });
    const { onSelectPost, onDeletePost } = usePostContext();

    const [isLoading, toggleLoading] = useReducer((s) => !s, false);

    const handleSelectPost = () => onSelectPost(props.post);
    const handleDeletePost = (post: Post) =>
      pipe(tap(toggleLoading), onDeletePost, andThen(toggleLoading))(post);

    return (
      <Box pos="relative">
        <Paper
          withBorder
          shadow="lg"
          className={classes.postItem}
          onClick={isSelectable ? handleSelectPost : undefined}
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
                onDeletePost={handleDeletePost}
              />
            </Stack>
          </Flex>
        </Paper>
        <LoadingOverlay
          visible={isLoading}
          overlayBlur={2}
          transitionDuration={500}
        />
      </Box>
    );
  },
  isEqual,
);

PostItem.displayName = "PostItem";
export default PostItem;
