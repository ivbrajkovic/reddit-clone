import { isUser } from "@/features/auth/utility";
import { useUserCommunitySnippets } from "@/features/communities/hooks/useCommunitySnippets";
import { auth } from "@/firebase/clientApp";
import { ifElse } from "ramda";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthState = () => {
  const { getUserCommunitySnippets, clearUserCommunitySnippets } =
    useUserCommunitySnippets();

  const [user] = useAuthState(auth);

  useEffect(() => {
    ifElse(isUser, getUserCommunitySnippets, clearUserCommunitySnippets)(user);
  }, [clearUserCommunitySnippets, getUserCommunitySnippets, user]);

  return null;
};
export default AuthState;
