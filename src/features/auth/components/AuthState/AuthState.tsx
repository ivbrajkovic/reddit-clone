import { toggleCommunityLoader } from "@/features/communities/communitySlice";
import { useFetchCommunitySnippets } from "@/features/communities/hooks/useCommunitySnippets";
import { useFetchPostVotes } from "@/features/posts/hooks/useFetchPostVotes";
import { auth } from "@/firebase/clientApp";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthState = () => {
  const [user] = useAuthState(auth);
  const fetchPostVotes = useFetchPostVotes();
  const fetchCommunitySnippets = useFetchCommunitySnippets();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;

    const toggleLoader = () => dispatch(toggleCommunityLoader());
    toggleLoader();

    Promise.all([
      fetchPostVotes(user.uid),
      fetchCommunitySnippets(user.uid),
    ]).then(toggleLoader);
  }, [dispatch, fetchCommunitySnippets, fetchPostVotes, user]);

  return null;
};
export default AuthState;
