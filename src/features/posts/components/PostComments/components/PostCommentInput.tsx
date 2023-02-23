import { showNotificationError } from "@/common/showNotificationError";
import { Textarea } from "@/components/FormControls";
import AuthButtons from "@/components/Navbar/RightContent/AuthButton";
import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import { formatDisplayName } from "@/features/auth/utility";
import { useCreatePostComment } from "@/features/posts/hooks/useCreatePostComment";
import { Post } from "@/features/posts/types";
import { Button, Flex, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC } from "react";

const NotAuthenticated = () => {
  return (
    <Flex justify="space-around">
      <Text fz="lg" fw="bolder">
        Log in or sign up to leave a comment
      </Text>
      <AuthButtons />
    </Flex>
  );
};

type FormValues = { commentText: string };

type PostCommentInputProps = { post: Post };

const PostCommentInput: FC<PostCommentInputProps> = (props) => {
  const user = useSignedInUser();
  const { isLoading, createPostComment } = useCreatePostComment();
  const form = useForm<FormValues>({ initialValues: { commentText: "" } });

  if (!user) return <NotAuthenticated />;

  const onSubmit = async (values: FormValues) =>
    createPostComment(values.commentText, props.post, user)
      .then(form.reset)
      .catch(showNotificationError("Error creating post comment."));

  const displayName = formatDisplayName(user);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Text mb="xs">Comment as {displayName}</Text>
      <Textarea
        mb="md"
        minRows={5}
        placeholder="What are your thoughts?"
        {...form.getInputProps("commentText")}
      ></Textarea>
      <Group mb="xs" position="right">
        <Button
          type="submit"
          h={26}
          disabled={!form.values.commentText}
          loading={isLoading}
        >
          Create comment
        </Button>
      </Group>
    </form>
  );
};
export default PostCommentInput;
