import { useFetchPosts } from "@/features/posts/hooks/useFetchPosts";
import { selectPosts } from "@/features/posts/postsSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const usePosts = () => {
  const router = useRouter();
  const fetchPosts = useFetchPosts();
  const posts = useSelector(selectPosts);

  const [isLoading, setIsLoading] = useState(true); // Can't be anonymous reducer

  useEffect(() => {
    const communityId = router.query.communityId as string;
    setIsLoading(true);
    fetchPosts(communityId).then(() => setIsLoading(false));
  }, [fetchPosts, router.query.communityId]);

  return { isLoading, posts };
};
