import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import PostItem from "@/features/posts/components/PostItem/PostItem";
import { PostLoader } from "@/features/posts/components/PostLoader";
import { useFetchPosts } from "@/features/posts/hooks/useFetchPosts";
import { Stack } from "@mantine/core";

const PostList = () => {
  const user = useSignedInUser();
  const { isLoading, posts } = useFetchPosts({
    fetchOnMount: true,
  });

  if (isLoading) return <PostLoader />;

  return (
    <Stack>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          userIsCreator={user?.uid === post.creatorId}
          {...post}
        />
      ))}
    </Stack>
  );
};
export default PostList;
