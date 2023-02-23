import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import PostCommentInput from "@/features/posts/components/PostComments/components/PostCommentInput";
import PostCommentItem from "@/features/posts/components/PostComments/components/PostCommentItem";
import PostCommentLoader from "@/features/posts/components/PostComments/components/PostCommentLoader";
import { useFetchPostComments } from "@/features/posts/hooks/useFetchPostComments";
import { selectPostComments } from "@/features/posts/postsSlice";
import { Post } from "@/features/posts/types";
import { useAppSelector } from "@/store/hooks";
import { Paper, Stack } from "@mantine/core";
import { FC, useEffect } from "react";

type PostCommentsProps = { post: Post };

const PostComments: FC<PostCommentsProps> = (props) => {
  const user = useSignedInUser();
  const postComments = useAppSelector(selectPostComments);
  const { isLoading, fetchComments } = useFetchPostComments();

  useEffect(() => {
    fetchComments(props.post.id);
  }, [fetchComments, props.post.id]);

  if (isLoading)
    return (
      <Paper withBorder shadow="lg" px="md" py="xl">
        <PostCommentLoader />
      </Paper>
    );

  return (
    <Paper withBorder shadow="lg" p="md">
      <Stack spacing="lg">
        <PostCommentInput user={user} post={props.post} />
        {postComments.map((comment) => (
          <PostCommentItem
            key={comment.id}
            isCreator={user?.uid === comment.creatorId}
            comment={comment}
          />
        ))}
      </Stack>
    </Paper>
  );
};
export default PostComments;
