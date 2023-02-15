import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import PostItem from "@/features/posts/components/PostList/components/PostItem";
import { useFetchPosts } from "@/features/posts/hooks/useFetchPosts";
import { usePosts } from "@/features/posts/hooks/usePosts";
import { Stack } from "@mantine/core";

const PostList = () => {
  const user = useSignedInUser();
  useFetchPosts({ fetchOnMount: true, loadingNotification: false });
  const { posts, onSelectedPost, onVotePost, onDeletePost } = usePosts();

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
