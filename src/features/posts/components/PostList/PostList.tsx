import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import { useCommunityData } from "@/features/communities/hooks/useCommunityData";
import PostItem from "@/features/posts/components/PostItem/PostItem";
import { PostLoader } from "@/features/posts/components/PostLoader";
import { PostProvider } from "@/features/posts/context/PostContext";
import { useFetchPosts } from "@/features/posts/hooks/useFetchPosts";
import { selectPostVotes } from "@/features/posts/postsSlice";
import { PostVotes } from "@/features/posts/types";
import { Stack } from "@mantine/core";
import { useSelector } from "react-redux";

const getPostVoteByPostId = (postId: string, postVotes: PostVotes) => {
  const voteId = postVotes.lookUpVoteIdByPostId[postId];
  return postVotes.votes[voteId] ?? {};
};

const PostList = () => {
  const user = useSignedInUser();
  const community = useCommunityData();
  const postVotes = useSelector(selectPostVotes);

  const { isLoading, posts } = useFetchPosts({ fetchOnMount: true });

  if (isLoading) return <PostLoader />;

  return (
    <PostProvider>
      <Stack>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            community={community}
            postVote={getPostVoteByPostId(post.id, postVotes)}
            userIsCreator={user?.uid === post.creatorId}
          />
        ))}
      </Stack>
    </PostProvider>
  );
};
export default PostList;
