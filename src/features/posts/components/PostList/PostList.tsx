import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import PostItem from "@/features/posts/components/PostItem/PostItem";
import { PostLoader } from "@/features/posts/components/PostLoader";
import { useFetchPosts } from "@/features/posts/hooks/useFetchPosts";
import { usePosts } from "@/features/posts/hooks/usePosts";
import { Stack } from "@mantine/core";

const PostList = () => {
  const user = useSignedInUser();
  const { isLoading } = useFetchPosts({ fetchOnMount: true });
  const posts = usePosts();

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
