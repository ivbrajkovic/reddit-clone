import { showNotificationError } from "@/common/showNotificationError";
import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import {
  addPostVote,
  deletePostVote,
  selectPostVotes,
  updatePost,
  updatePostVote,
} from "@/features/posts/postsSlice";
import { Post, PostVote } from "@/features/posts/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { collection, doc, writeBatch } from "firebase/firestore";

const createPostVote = (id: string, vote: number, post: Post): PostVote => ({
  id,
  postId: post.id,
  communityId: post.communityId,
  voteValue: vote,
});

const createPostVoteRef = (userId: string) =>
  doc(collection(firestore, "users", `${userId}/postVotes`));

const getPostVoteRef = (userId: string, postVoteId: string) =>
  doc(firestore, "users", `${userId}/postVotes/${postVoteId}`);

export const useVotePost = () => {
  const user = useSignedInUser();
  const dispatch = useAppDispatch();
  const { votes, lookUpVoteIdByPostId: lookUpVoteIdByPostId } =
    useAppSelector(selectPostVotes);

  const votePost = async (vote: number, post: Post) => {
    try {
      if (!user) throw new Error("User not signed in");

      const createNewVote = async () => {
        // Change vote status
        const updatedPost = { ...post, voteStatus: post.voteStatus + vote };

        // Create new vote
        const batch = writeBatch(firestore);
        const postRef = doc(firestore, "posts", post.id);
        batch.update(postRef, { voteStatus: updatedPost.voteStatus });
        const posteVoteRef = createPostVoteRef(user.uid);
        const newVote = createPostVote(posteVoteRef.id, vote, post);
        batch.set(posteVoteRef, newVote);
        await batch.commit();

        // Dispatch post vote changes to store
        dispatch(updatePost(updatedPost));
        dispatch(addPostVote(newVote));
      };

      const removeExistingVote = async (existingVote: PostVote) => {
        // Change vote status
        const updatedPost = { ...post, voteStatus: post.voteStatus - vote };

        // Remove existing vote
        const batch = writeBatch(firestore);
        const postRef = doc(firestore, "posts", post.id);
        batch.update(postRef, { voteStatus: updatedPost.voteStatus });
        const postVoteRef = getPostVoteRef(user.uid, existingVote.id);
        batch.delete(postVoteRef);
        await batch.commit();

        // Dispatch post vote changes to store
        dispatch(updatePost(updatedPost));
        dispatch(deletePostVote(existingVote.id));
      };

      const updateExistingVote = async (existingVote: PostVote) => {
        // Change vote status
        const updatedPost = { ...post, voteStatus: post.voteStatus + vote * 2 };

        // Update existing vote
        const batch = writeBatch(firestore);
        const postRef = doc(firestore, "posts", post.id);
        batch.update(postRef, { voteStatus: updatedPost.voteStatus });
        const postVoteRef = getPostVoteRef(user.uid, existingVote.id);
        batch.update(postVoteRef, { voteValue: vote });
        await batch.commit();

        // Dispatch post vote changes to store
        dispatch(updatePost(updatedPost));
        dispatch(updatePostVote({ ...existingVote, voteValue: vote }));
      };

      const existingVote = getPostVoteByPostId(post.id);

      if (!existingVote) await createNewVote();
      else if (existingVote.voteValue === vote)
        await removeExistingVote(existingVote);
      else if (existingVote.voteValue !== vote)
        await updateExistingVote(existingVote);
    } catch (error) {
      showNotificationError("Error voting post")(error);
    }
  };

  const getPostVoteByPostId = (postId: string): PostVote | undefined => {
    const voteId = lookUpVoteIdByPostId[postId];
    const vote = votes[voteId];
    return vote;
  };

  const getPostVoteValueByPostId = useEventCallback(
    (postId: string): number => {
      const voteId = lookUpVoteIdByPostId[postId];
      const vote = votes[voteId];
      return vote?.voteValue ?? 0;
    },
  );

  const incrementVote = useEventCallback((post: Post) => votePost(1, post));
  const decrementVote = useEventCallback((post: Post) => votePost(-1, post));

  return {
    votes,
    getPostVoteByPostId,
    getPostVoteValueByPostId,
    incrementVote,
    decrementVote,
  };
};
