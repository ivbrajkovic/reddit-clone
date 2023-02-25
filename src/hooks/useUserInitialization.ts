import { setAuthUser } from "@/features/auth/authSlice";
import { useFetchCommunitySnippets } from "@/features/communities/hooks/useFetchCommunitySnippets";
import { useFetchPostVotes } from "@/features/posts/hooks/useFetchPostVotes";
import { auth } from "@/firebase/clientApp";
import { useRenderCount } from "@/hooks/useRenderCount";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const useUserInitialization = () => {
  useRenderCount("useUserInitialization");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const fetchPostVotes = useFetchPostVotes();
  const fetchSnippets = useFetchCommunitySnippets();

  // User initialization

  const [user, isLoadingUser] = useAuthState(auth);
  useEffect(() => {
    if (!isLoadingUser) dispatch(setAuthUser(user));
  }, [dispatch, isLoadingUser, user]);

  // User community snippets

  const userId = user?.uid;
  useEffect(() => {
    userId && fetchSnippets(userId);
  }, [fetchSnippets, userId]);

  // User post votes

  const communityId = router.query.communityId as string;
  useEffect(() => {
    userId && communityId && fetchPostVotes(userId, communityId);
  }, [communityId, fetchPostVotes, userId]);
};
