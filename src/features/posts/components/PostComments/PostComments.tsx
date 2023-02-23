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
  const { isLoading, fetchComments } = useFetchPostComments();
  const postComments = useAppSelector(selectPostComments);

  useEffect(() => {
    fetchComments(props.post.id);
  }, [fetchComments, props.post.id]);

  return (
    <Paper withBorder shadow="lg" p="md">
      <PostCommentInput user={user} post={props.post} />
      <Stack spacing="lg">
        {isLoading ? (
          <PostCommentLoader />
        ) : (
          <>
            {postComments.map((comment) => (
              <PostCommentItem
                key={comment.id}
                isCreator={user?.uid === comment.creatorId}
                comment={comment}
              />
            ))}
          </>
        )}
      </Stack>
    </Paper>
  );
};
export default PostComments;
