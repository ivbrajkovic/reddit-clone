import { showNotificationError } from "@/common/showNotificationError";
import { leaveCommunity } from "@/features/communities/communitySlice";
import { Community } from "@/features/communities/types";
import { firestore } from "@/firebase/clientApp";
import { useAppDispatch } from "@/store/hooks";
import { User } from "firebase/auth";
import { doc, increment, WriteBatch, writeBatch } from "firebase/firestore";
import { andThen, otherwise, pipe } from "ramda";
import { useCallback } from "react";

export const useLeaveCommunity = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (user: User, communityData: Community) => {
      const getCommunityId = () => communityData.communityId;

      const createWritingBatch = () => writeBatch(firestore);
      const commitBatchToFirestore = (batch: WriteBatch) => batch.commit();

      const deleteCommunitySnippet = (batch: WriteBatch) => {
        const snippetsPath = `users/${user.uid}/communitySnippets`;
        return batch.delete(
          doc(firestore, snippetsPath, communityData.communityId),
        );
      };

      const updateCommunityNumberOfMembers = (batch: WriteBatch) =>
        batch.update(doc(firestore, "communities", communityData.communityId), {
          membersCount: increment(-1),
        });

      pipe(
        createWritingBatch,
        deleteCommunitySnippet,
        updateCommunityNumberOfMembers,
        commitBatchToFirestore,
        andThen(pipe(getCommunityId, leaveCommunity, dispatch)),
        otherwise(pipe(showNotificationError("Error leaving community"))),
      )();
    },
    [dispatch],
  );
};
