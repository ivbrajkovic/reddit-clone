import { showNotificationError } from "@/common/showNotificationError";
import { setCommunitySnippets } from "@/features/communities/communitySlice";
import { CommunitySnippet } from "@/features/communities/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch } from "@/store/hooks";
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { andThen, map, otherwise, pipe, prop } from "ramda";

const formatSnippetPath = (userId: string) =>
  `users/${userId}/communitySnippets`;
const getSnippetCollection = (path: string) => collection(firestore, path);

const formatSnippets = (doc: QueryDocumentSnapshot) =>
  ({
    communityId: doc.id,
    ...doc.data(),
  } as CommunitySnippet);

export const useFetchCommunitySnippets = () => {
  const dispatch = useAppDispatch();

  return useEventCallback(async (userId: string) => {
    return pipe(
      formatSnippetPath,
      getSnippetCollection,
      getDocs,
      andThen(
        pipe(
          prop("docs"),
          map(formatSnippets),
          pipe(setCommunitySnippets, dispatch),
        ),
      ),
      otherwise(showNotificationError("Error getting community snippets")),
    )(userId);
  });
};
