import { showNotificationError } from "@/common/showNotificationError";
import { setCommunitySnippets } from "@/features/communities/communitySlice";
import {
  CommunitySnippet,
  CommunitySnippetsState,
} from "@/features/communities/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch } from "@/store/hooks";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { pipe } from "ramda";

export const errorFetchingCommunitySnippets = showNotificationError(
  "Error getting community snippets",
);

export const formatCommunitySnippets2 = (postDocs: QuerySnapshot) =>
  postDocs.docs.map((doc) => ({
    ...doc.data(),
    communityId: doc.id,
  })) as CommunitySnippet[];

const formatCommunitySnippets = (postDocs: QuerySnapshot) =>
  postDocs.docs.reduce(
    (acc, doc, index) => {
      const {
        communitySnippets,
        communitySnippetsIndexLookupById: communitySnippetsLookupById,
      } = acc;
      const snippet = doc.data() as CommunitySnippet;
      const communityId = snippet.communityId;
      communitySnippetsLookupById[communityId] = index;
      communitySnippets[index] = snippet;
      return acc;
    },
    {
      communitySnippets: [],
      communitySnippetsIndexLookupById: {},
    } as Omit<CommunitySnippetsState, "isCommunitySnippetsFetched">,
  );

export const fetchCommunitySnippets = (userId: string) => {
  const path = `users/${userId}/communitySnippets`;
  return getDocs(collection(firestore, path));
};

export const useFetchCommunitySnippets = () => {
  const dispatch = useAppDispatch();
  return useEventCallback((userId: string) => {
    const dispatchCommunitySnippets = pipe(
      formatCommunitySnippets,
      setCommunitySnippets,
      dispatch,
    );

    return fetchCommunitySnippets(userId)
      .then(dispatchCommunitySnippets)
      .catch(errorFetchingCommunitySnippets);
  });
};
