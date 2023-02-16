import PostItemBody from "@/features/posts/components/PostItem/components/PostItemBody";
import { usePostItemContext } from "@/features/posts/components/PostItem/components/postItemContext";
import PostItemFooter from "@/features/posts/components/PostItem/components/PostItemFooter";
import PostItemHeader from "@/features/posts/components/PostItem/components/PostItemHeader";
import PostItemProvider from "@/features/posts/components/PostItem/components/PostItemProvider";
import usePostItemStyles from "@/features/posts/components/PostItem/components/postItemStyles";
import VoteButtons from "@/features/posts/components/PostItem/components/VoteButton";
import { Post } from "@/features/posts/types";
import { Box, Flex, Paper, Stack } from "@mantine/core";
import { FC, memo } from "react";

export type PostItemProps = Post & { userIsCreator: boolean };

const isEqual = (prevProps: PostItemProps, nextProps: PostItemProps) =>
  prevProps.id === nextProps.id;

const WithPostItemProvider: FC<PostItemProps> = memo(
  (props) => (
    <PostItemProvider {...props}>
      <PostItem />
    </PostItemProvider>
  ),
  isEqual,
);

WithPostItemProvider.displayName = "PostItem(WithPostItemProvider)";

const PostItem = () => {
  const { classes } = usePostItemStyles();
  const { onSelectPost } = usePostItemContext();

  return (
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
  );
};

export default WithPostItemProvider;
