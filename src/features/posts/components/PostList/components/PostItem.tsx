import PostItemFooter from "@/features/posts/components/PostList/components/PostItemFooter";
import VoteButtons from "@/features/posts/components/PostList/components/VoteButton";
import { Post } from "@/features/posts/types";
import {
  Box,
  createStyles,
  Flex,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import dayjs from "dayjs";
import { FC } from "react";

const useStyles = createStyles((theme) => ({
  postItem: {
    cursor: "pointer",
    "&:hover": {
      borderColor: theme.colors.blue[5],
    },
  },
  leftSide: {
    alignSelf: "stretch",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
  },
}));

export type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue: number;
  onVotePost: (value: number) => void;
  onDeletePost: () => void;
  onSelectPost: () => void;
};

const PostItem: FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVotePost,
  onDeletePost,
  onSelectPost,
}) => {
  const { classes } = useStyles();
  const formatCreatedAt = dayjs(post.createdAt.seconds * 1000).fromNow();

  return (
    <Paper
      withBorder
      shadow="lg"
      className={classes.postItem}
      onClick={onSelectPost}
    >
      <Flex>
        <Box className={classes.leftSide}>
          <VoteButtons userVoteValue={userVoteValue} onVotePost={onVotePost} />
        </Box>

        <Stack pt={8} pl={4} spacing={4} w="100%">
          <Group mb={4} spacing="sm" fz="9pt">
            <div>pic</div>
            <Text>Posted by u/{post.creatorDisplayName}</Text>
            <Text>{formatCreatedAt}</Text>
          </Group>
          <Text mb={4} fz="12pt" fw={600}>
            {post.title}
          </Text>
          <Text>{post.body}</Text>

          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt="post"
              fit="contain"
              styles={{
                image: {
                  maxHeight: 460,
                },
              }}
            />
          ) : null}

          <PostItemFooter />
        </Stack>
      </Flex>
    </Paper>
  );
};
export default PostItem;
