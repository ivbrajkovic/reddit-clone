import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import { useFetchCommunitySnippets } from "@/features/communities/hooks/useFetchCommunitySnippets";
import { isString } from "@/utility";
import { when } from "ramda";
import { useEffect } from "react";

export const useCommunitySnippets = () => {
  const user = useSignedInUser();
  const fetchCommunitySnippets = useFetchCommunitySnippets();

  useEffect(() => {
    const userId = user?.uid;
    when(isString, fetchCommunitySnippets)(userId);
  }, [user?.uid, fetchCommunitySnippets]);
};
