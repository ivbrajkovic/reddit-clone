import { toggleCommunityLoader } from "@/features/communities/communitySlice";
import { useFetchCommunitySnippets } from "@/features/communities/hooks/useCommunitySnippets";
import { auth } from "@/firebase/clientApp";
import { useAppDispatch } from "@/store/hooks";
import { isString } from "@/utility";
import { andThen, pipe, tap, when } from "ramda";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthState = () => {
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const fetchCommunitySnippets = useFetchCommunitySnippets();

  useEffect(() => {
    const dispatchCommunityLoader = () => dispatch(toggleCommunityLoader());
    when(
      isString,
      pipe(
        tap(dispatchCommunityLoader),
        fetchCommunitySnippets,
        andThen(dispatchCommunityLoader),
      ),
    )(user?.uid);
  }, [dispatch, fetchCommunitySnippets, user]);

  return null;
};
export default AuthState;
