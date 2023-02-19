import PostItemBody from "@/features/posts/components/PostItem/components/PostItemBody";
import PostItemFooter from "@/features/posts/components/PostItem/components/PostItemFooter";
import PostItemHeader from "@/features/posts/components/PostItem/components/PostItemHeader";
import usePostItemStyles from "@/features/posts/components/PostItem/components/postItemStyles";
import VoteButtons from "@/features/posts/components/PostItem/components/VoteButton";
import { usePostContext } from "@/features/posts/context/postContext";
import { selectIsLoadingPost } from "@/features/posts/postsSlice";
import { Post, PostVote } from "@/features/posts/types";
import { useRenderCount } from "@/hooks/useRenderCount";
import { useAppSelector } from "@/store/hooks";
import { Box, Flex, LoadingOverlay, Paper, Stack } from "@mantine/core";
import { FC, memo } from "react";

const isEqual = (prevProps: PostItemProps, nextProps: PostItemProps) =>
  prevProps.post.id === nextProps.post.id &&
  prevProps.postVote.voteValue === nextProps.postVote.voteValue;

export type PostItemProps = {
  post: Post;
  postVote: PostVote;
};

const PostItem: FC<PostItemProps> = memo((props) => {
  useRenderCount("PostItem -> " + props.post.id);

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
            <PostItemFooter post={props.post} />
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
}, isEqual);

PostItem.displayName = "PostItem";
export default PostItem;
