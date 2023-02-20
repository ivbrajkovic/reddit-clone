import PostItem from "@/features/posts/components/PostItem/PostItem";
import { PostLoader } from "@/features/posts/components/PostLoader";
import { usePosts } from "@/features/posts/hooks/usePosts";
import { useRenderCount } from "@/hooks/useRenderCount";
import { Stack } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";

const PostList = () => {
  useRenderCount("PostList");
  const { isLoading, posts, postVotes } = usePosts();

  if (isLoading) return <PostLoader />;

  return (
    <Stack>
      <AnimatePresence mode="popLayout">
        {posts.map((post) => {
          const voteId = postVotes.lookUpVoteIdByPostId[post.id];
          const postVote = postVotes.votes[voteId] ?? {};
          return (
            <motion.div
              layout
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "tween" }}
              key={post.id}
            >
              <PostItem post={post} postVote={postVote} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Stack>
  );
};
export default PostList;
