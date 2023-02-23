import { showNotificationError } from "@/common/showNotificationError";
import { Textarea } from "@/components/FormControls";
import AuthButtons from "@/components/Navbar/RightContent/AuthButton";
import { formatDisplayName } from "@/features/auth/utility";
import { useCreatePostComment } from "@/features/posts/hooks/useCreatePostComment";
import { Post } from "@/features/posts/types";
import { Button, Flex, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { User } from "firebase/auth";
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

type PostCommentInputProps = {
  user: User | null | undefined;
  post: Post;
};

const PostCommentInput: FC<PostCommentInputProps> = ({ user, post }) => {
  const { isLoading, createPostComment } = useCreatePostComment();
  const form = useForm<FormValues>({ initialValues: { commentText: "" } });

  if (!user) return <NotAuthenticated />;

  const onSubmit = async (values: FormValues) =>
    createPostComment(values.commentText, post, user)
      .then(form.reset)
      .catch(showNotificationError("Error creating post comment."));

  const displayName = formatDisplayName(user);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Group mb="xs" spacing="xs">
        <Text>Comment as</Text>
        <Text color="blue">{displayName}</Text>
      </Group>
      <Textarea
        mb="md"
        minRows={5}
        placeholder="What are your thoughts?"
        {...form.getInputProps("commentText")}
      ></Textarea>
      <Group position="right">
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
