import PostItemBody from "@/features/posts/components/PostItem/components/PostItemBody";
import { PostItemProps } from "@/features/posts/components/PostItem/components/postItemContext";
import PostItemFooter from "@/features/posts/components/PostItem/components/PostItemFooter";
import PostItemHeader from "@/features/posts/components/PostItem/components/PostItemHeader";
import PostItemProvider from "@/features/posts/components/PostItem/components/PostItemProvider";
import usePostItemStyles from "@/features/posts/components/PostItem/components/postItemStyles";
import VoteButtons from "@/features/posts/components/PostItem/components/VoteButton";
import { Box, Flex, Paper, Stack } from "@mantine/core";
import { FC } from "react";

const PostItem: FC<PostItemProps> = (props) => {
  const { classes } = usePostItemStyles();
  return (
    <PostItemProvider {...props}>
      <Paper
        withBorder
        shadow="lg"
        className={classes.postItem}
        onClick={props.onSelectPost}
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
    </PostItemProvider>
  );
};

export default PostItem;
