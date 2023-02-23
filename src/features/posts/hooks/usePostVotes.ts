import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import { useFetchPostVotes } from "@/features/posts/hooks/useFetchPostVotes";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const usePostVotes = () => {
  const router = useRouter();
  const user = useSignedInUser();
  const fetchPostVotes = useFetchPostVotes();

  useEffect(() => {
    const communityId = router.query.communityId as string;
    const userId = user?.uid;

    if (!communityId || !userId) return;

    fetchPostVotes(communityId, userId);
  }, [fetchPostVotes, router.query.communityId, user?.uid]);
};
