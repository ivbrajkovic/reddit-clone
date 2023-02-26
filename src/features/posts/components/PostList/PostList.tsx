import PostItem from "@/features/posts/components/PostItem/PostItem";
import { PostLoader } from "@/features/posts/components/PostLoader";
import { selectPosts, selectPostVotes } from "@/features/posts/postsSlice";
import { Stack } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { useSelector } from "react-redux";

export type PostListProps = { isLoading?: boolean; isHomePage?: boolean };

const PostList: FC<PostListProps> = ({ isLoading, isHomePage }) => {
  const posts = useSelector(selectPosts);
  const postVotes = useSelector(selectPostVotes);

  if (isLoading) return <PostLoader />;

  return (
    <Stack>
      <AnimatePresence mode="popLayout">
        {posts.map((post) => {
          const voteId = postVotes.lookUpVoteIdByPostId[post.id];
          const postVote = postVotes.votes[voteId];
          return (
            <motion.div
              layout
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "tween" }}
              key={post.id}
            >
              <PostItem
                isHomePage={isHomePage}
                post={post}
                postVote={postVote}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Stack>
  );
};
export default PostList;
