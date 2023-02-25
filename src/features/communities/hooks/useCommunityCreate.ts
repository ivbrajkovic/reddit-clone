import { useUser } from "@/features/auth/hooks/useSignedInUser";
import { getUserIdOrThrow } from "@/features/auth/utility/utility";
import { addCommunitySnippet } from "@/features/communities/communitySlice";
import {
  Community,
  CommunitySnippet,
  CreateCommunityFormValues,
} from "@/features/communities/types";
import { firestore } from "@/firebase/clientApp";
import { runTransactionAsync, throwIfDocumentExists } from "@/firebase/utility";
import { useAppDispatch } from "@/store/hooks";
import { doc, serverTimestamp, Timestamp } from "firebase/firestore";
import { pipe, tap } from "ramda";
import { useReducer } from "react";

export const useCommunityCreate = () => {
  const user = useUser();
  const dispatch = useAppDispatch();
  const [isLoading, toggleLoading] = useReducer((s) => !s, false);

  const handleCreateCommunity = (values: CreateCommunityFormValues) => {
    const { communityName, privacyType: communityType, adultContent } = values;
    const addCommunitySnippetToStore = pipe(addCommunitySnippet, dispatch);

    return runTransactionAsync(async (transaction) => {
      toggleLoading();
      const userId = getUserIdOrThrow(user); // This should never throw an error.

      const communityRef = doc(firestore, "communities", communityName);
      const communityDoc = await transaction.get(communityRef);
      throwIfDocumentExists(communityDoc);

      const community: Community = {
        communityId: communityDoc.id,
        privacyType: communityType,
        adultContent,
        creatorId: userId,
        membersCount: 1,
        imageUrl: null,
        createdAt: serverTimestamp() as Timestamp,
      };
      transaction.set(communityRef, community);

      const communitySnippet: CommunitySnippet = {
        communityId: communityName,
        isModerator: true,
        imageUrl: null,
      };
      const communitySnippetRef = doc(
        firestore,
        `users/${userId}/communitySnippets`,
        communityName,
      );
      transaction.set(communitySnippetRef, communitySnippet);

      return communitySnippet;
    })
      .then(tap(addCommunitySnippetToStore))
      .finally(toggleLoading);
  };

  return { handleCreateCommunity, isLoading };
};
