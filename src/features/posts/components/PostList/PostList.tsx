import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import PostItem from "@/features/posts/components/PostItem/PostItem";
import { PostLoader } from "@/features/posts/components/PostLoader";
import { useFetchPosts } from "@/features/posts/hooks/useFetchPosts";
import { usePosts } from "@/features/posts/hooks/usePosts";
import { Stack } from "@mantine/core";

const PostList = () => {
  const user = useSignedInUser();
  const { isLoading } = useFetchPosts({ fetchOnMount: true });
  console.log("🚀 ~ file: PostList.tsx:11 ~ PostList ~ isLoading", isLoading);
  const { posts, onSelectedPost, onVotePost, onDeletePost } = usePosts();

  if (isLoading) return <PostLoader />;

  return (
    <Stack>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          userIsCreator={user?.uid === post.creatorId}
          userVoteValue={post.voteStatus}
          onVotePost={onVotePost}
          onDeletePost={onDeletePost}
          onSelectPost={onSelectedPost}
        />
      ))}
    </Stack>
  );
};
export default PostList;
