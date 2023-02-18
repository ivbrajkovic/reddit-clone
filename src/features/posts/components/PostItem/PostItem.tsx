import PostItemBody from "@/features/posts/components/PostItem/components/PostItemBody";
import PostItemFooter from "@/features/posts/components/PostItem/components/PostItemFooter";
import PostItemHeader from "@/features/posts/components/PostItem/components/PostItemHeader";
import PostItemProvider from "@/features/posts/components/PostItem/components/PostItemProvider";
import usePostItemStyles from "@/features/posts/components/PostItem/components/postItemStyles";
import VoteButtons from "@/features/posts/components/PostItem/components/VoteButton";
import { useSelectPost } from "@/features/posts/hooks/useSeledtPost";
import { selectIsLoadingPost } from "@/features/posts/postsSlice";
import { Post } from "@/features/posts/types";
import { useRenderCount } from "@/hooks/useRenderCount";
import { useAppSelector } from "@/store/hooks";
import { Box, Flex, LoadingOverlay, Paper, Stack } from "@mantine/core";
import { FC, memo } from "react";

const isEqual = (prevProps: PostItemProps, nextProps: PostItemProps) =>
  prevProps.id === nextProps.id &&
  prevProps.voteStatus === nextProps.voteStatus;

export type PostItemProps = Post & { userIsCreator: boolean };

const PostItem: FC<PostItemProps> = memo((props) => {
  useRenderCount("PostItem -> " + props.id);
  const { classes } = usePostItemStyles();
  const onSelectPost = useSelectPost(props.id);
  const isLoadingPost = useAppSelector(selectIsLoadingPost);

  return (
    <PostItemProvider {...props}>
      <Box pos="relative">
        <Paper
          withBorder
          shadow="lg"
          className={classes.postItem}
          onClick={onSelectPost}
        >
          <Flex>
            <Box className={classes.leftSide}>
              <VoteButtons />
            </Box>

            <Stack pt={8} pl={4} spacing={4} w="100%">
              <PostItemHeader />
              <PostItemBody />
              <PostItemFooter />
            </Stack>
          </Flex>
        </Paper>
        <LoadingOverlay
          visible={isLoadingPost}
          overlayBlur={2}
          transitionDuration={500}
        />
      </Box>
    </PostItemProvider>
  );
}, isEqual);

PostItem.displayName = "PostItem";
export default PostItem;
