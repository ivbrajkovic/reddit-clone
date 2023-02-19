import PostItem from "@/features/posts/components/PostItem/PostItem";
import { PostLoader } from "@/features/posts/components/PostLoader";
import { useFetchPosts } from "@/features/posts/hooks/useFetchPosts";
import { selectPostVotes } from "@/features/posts/postsSlice";
import { PostVotes } from "@/features/posts/types";
import { useRenderCount } from "@/hooks/useRenderCount";
import { Stack } from "@mantine/core";
import { useSelector } from "react-redux";

const getPostVoteByPostId = (postId: string, postVotes: PostVotes) => {
  const voteId = postVotes.lookUpVoteIdByPostId[postId];
  return postVotes.votes[voteId] ?? {};
};

const PostList = () => {
  useRenderCount("PostList");

  const postVotes = useSelector(selectPostVotes);

  const { isLoading, posts } = useFetchPosts({ fetchOnMount: true });

  if (isLoading) return <PostLoader />;

  return (
    <Stack>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          postVote={getPostVoteByPostId(post.id, postVotes)}
        />
      ))}
    </Stack>
  );
};
export default PostList;
