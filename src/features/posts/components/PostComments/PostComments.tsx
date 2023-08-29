import { useUser } from "@/features/auth/hooks/useSignedInUser";
import PostCommentInput from "@/features/posts/components/PostComments/components/PostCommentInput";
import PostCommentItem from "@/features/posts/components/PostComments/components/PostCommentItem";
import PostCommentLoader from "@/features/posts/components/PostComments/components/PostCommentLoader";
import { useDeletePostComment } from "@/features/posts/hooks/useDeletePostComment";
import { useFetchPostComments } from "@/features/posts/hooks/useFetchPostComments";
import { selectPostComments } from "@/features/posts/postsSlice";
import { Post } from "@/features/posts/types";
import { useAppSelector } from "@/store/hooks";
import { Paper, Stack } from "@mantine/core";
import { FC, useEffect } from "react";

type PostCommentsProps = { post: Post };

const PostComments: FC<PostCommentsProps> = (props) => {
  const user = useUser();
  const postComments = useAppSelector(selectPostComments);
  const { isLoading, fetchPostComments } = useFetchPostComments();
  const { loadingCommentId, deletePostComment } = useDeletePostComment();

  useEffect(() => {
    fetchPostComments(props.post.id);
  }, [fetchPostComments, props.post.id]);

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
            isLoading={comment.id === loadingCommentId}
            comment={comment}
            onDelete={deletePostComment}
          />
        ))}
      </Stack>
    </Paper>
  );
};
export default PostComments;
