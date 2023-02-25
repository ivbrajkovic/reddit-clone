import PageContent from "@/components/Layout/PageContent";
import { CommunityAbout } from "@/features/communities/components/CommunityAbout";
import { withFetchCommunityData } from "@/features/communities/HOC/withFetchCommunityData";
import { PostComments } from "@/features/posts/components/PostComments";
import { PostItem } from "@/features/posts/components/PostItem";
import { PostLoader } from "@/features/posts/components/PostLoader";
import { PostNotFound } from "@/features/posts/components/PostNotFound";
import { usePostAndPostVote } from "@/features/posts/hooks/usePostAndPostVote";
import { useRenderCount } from "@/hooks/useRenderCount";
import { NextPage } from "next";

const PostWithComments = () => {
  const { isLoading, post, postVote } = usePostAndPostVote();
  if (isLoading) return <PostLoader postCount={1} />;
  if (!isLoading && !post) return <PostNotFound />;
  if (!post) return null;
  return (
    <>
      <PostItem post={post} postVote={postVote} />
      <PostComments post={post} />
    </>
  );
};

const CommunityAboutWithData = withFetchCommunityData(CommunityAbout);

const PostPage: NextPage = () => {
  useRenderCount("PostPage");
  return (
    <PageContent>
      <PostWithComments />
      <CommunityAboutWithData />
    </PageContent>
  );
};

export default PostPage;
