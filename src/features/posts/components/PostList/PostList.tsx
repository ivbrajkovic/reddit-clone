import PostItem from "@/features/posts/components/PostItem/PostItem";
import { PostLoader } from "@/features/posts/components/PostLoader";
import { usePosts } from "@/features/posts/hooks/usePosts";
import { useRenderCount } from "@/hooks/useRenderCount";
import { Stack } from "@mantine/core";

const PostList = () => {
  useRenderCount("PostList");
  const { isLoading, posts, postVotes } = usePosts();

  if (isLoading) return <PostLoader />;

  return (
    <Stack>
      {posts.map((post) => {
        const voteId = postVotes.lookUpVoteIdByPostId[post.id];
        const postVote = postVotes.votes[voteId] ?? {};
        return <PostItem key={post.id} post={post} postVote={postVote} />;
      })}
    </Stack>
  );
};
export default PostList;
