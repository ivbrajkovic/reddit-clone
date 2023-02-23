import PostCommentInput from "@/features/posts/components/PostComments/components/PostCommentInput";
import { Post } from "@/features/posts/types";
import { Paper } from "@mantine/core";
import { FC } from "react";

type PostCommentsProps = {
  post?: Post;
};

const PostComments: FC<PostCommentsProps> = (props) => {
  if (!props.post) return null;
  return (
    <Paper withBorder shadow="lg" p="xs">
      <PostCommentInput post={props.post} />
    </Paper>
  );
};
export default PostComments;
