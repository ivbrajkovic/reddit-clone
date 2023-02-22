import PageContent from "@/components/Layout/PageContent";
import { CommunityAbout } from "@/features/communities";
import { CommunityAboutLoader } from "@/features/communities/components/CommunityAboutLoader";
import { useFetchCommunityEffect } from "@/features/communities/hooks/useFetchCommunityEffect";
import { PostItem } from "@/features/posts/components/PostItem";
import { PostLoader } from "@/features/posts/components/PostLoader";
import { PostNotFound } from "@/features/posts/components/PostNotFound";
import { PostProvider } from "@/features/posts/context/postContext";
import { usePostAndPostVote } from "@/features/posts/hooks/usePostAndPostVote";
import { NextPage } from "next";

const PostPage: NextPage = () => {
  const { isLoading: isCommunityLoading, communityData } =
    useFetchCommunityEffect();

  const { isLoading: isPostLoading, post, postVote } = usePostAndPostVote();

  return (
    <PostProvider>
      <PageContent>
        <>
          {isPostLoading ? (
            <PostLoader postCount={1} />
          ) : !post ? (
            <PostNotFound />
          ) : (
            <PostItem post={post} postVote={postVote} />
          )}
        </>
        <>
          {isCommunityLoading ? (
            <CommunityAboutLoader />
          ) : !communityData.communityId ? (
            <div>Community not found</div>
          ) : (
            <CommunityAbout communityData={communityData} />
          )}
        </>
      </PageContent>
    </PostProvider>
  );
};

export default PostPage;
