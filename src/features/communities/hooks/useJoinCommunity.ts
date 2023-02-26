import { showNotificationError } from "@/common/showNotificationError";
import { joinCommunity } from "@/features/communities/communitySlice";
import { Community } from "@/features/communities/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch } from "@/store/hooks";
import { User } from "firebase/auth";
import { doc, increment, WriteBatch, writeBatch } from "firebase/firestore";
import { andThen, otherwise, pipe } from "ramda";

export const useJoinCommunity = () => {
  const dispatch = useAppDispatch();

  return useEventCallback((user: User, communityData: Community) => {
    const createWritingBatch = () => writeBatch(firestore);
    const commitBatchToFirestore = (batch: WriteBatch) => batch.commit();

    const createSnippet = () => ({
      imageUrl: communityData.imageUrl,
      communityId: communityData.communityId,
      isModerator: user.uid === communityData.creatorId,
    });

    const setCommunitySnippet = (batch: WriteBatch) => {
      const snippetsPath = `users/${user.uid}/communitySnippets`;
      return batch.set(
        doc(firestore, snippetsPath, communityData.communityId),
        createSnippet(),
      );
    };

    const updateCommunityNumberOfMembers = (batch: WriteBatch) =>
      batch.update(doc(firestore, "communities", communityData.communityId), {
        membersCount: increment(1),
      });

    return pipe(
      createWritingBatch,
      setCommunitySnippet,
      updateCommunityNumberOfMembers,
      commitBatchToFirestore,
      andThen(pipe(createSnippet, joinCommunity, dispatch)),
      otherwise(pipe(showNotificationError("Error joining community"))),
    )();
  });
};
