import PageContent from "@/components/Layout/PageContent";
import { PostItem } from "@/features/posts/components/PostItem";
import { PostLoader } from "@/features/posts/components/PostLoader";
import { PostNotFound } from "@/features/posts/components/PostNotFound";
import { PostProvider } from "@/features/posts/context/postContext";
import { usePost } from "@/features/posts/hooks/usePost";

const PostPage = () => {
  const { isLoading, post, postVote } = usePost();

  if (!isLoading && !post) return <PostNotFound />;

  return (
    <PostProvider>
      <PageContent>
        <>
          {isLoading ? (
            <PostLoader postCount={1} />
          ) : post ? (
            <PostItem post={post} postVote={postVote} />
          ) : null}
        </>
        <>{/* <CommunityAbout /> */}</>
      </PageContent>
    </PostProvider>
  );
};
export default PostPage;
