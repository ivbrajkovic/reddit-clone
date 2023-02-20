import PageContent from "@/components/Layout/PageContent";
import { PostItem } from "@/features/posts/components/PostItem";
import { PostProvider } from "@/features/posts/context/postContext";
import {
  selectPostVotes,
  selectSelectedPost,
} from "@/features/posts/postsSlice";
import { useSelector } from "react-redux";

const PostPage = () => {
  const post = useSelector(selectSelectedPost);
  const postVotes = useSelector(selectPostVotes);

  if (!post)
    return (
      <div>
        <h1>Post not found</h1>
      </div>
    );

  const voteId = postVotes.lookUpVoteIdByPostId[post.id];
  const postVote = postVotes.votes[voteId] ?? {};
  return (
    <PostProvider>
      <PageContent>
        <>
          <PostItem isSelectable={true} post={post} postVote={postVote} />
        </>
        <>{/* <CommunityAbout /> */}</>
      </PageContent>
    </PostProvider>
  );
};
export default PostPage;
