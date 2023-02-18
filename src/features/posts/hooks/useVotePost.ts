import { showNotificationError } from "@/common/showNotificationError";
import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import {
  selectPosts,
  selectPostVotes,
  setPostVoteByPostId,
  updatePostById,
} from "@/features/posts/postsSlice";
import { Post, PostVote } from "@/features/posts/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { collection, doc, writeBatch } from "firebase/firestore";

const findPostVoteByPostId = (postVotes: PostVote[], postId: string) =>
  postVotes.find((postVotes) => postVotes.postId === postId);

export const useVotePost = () => {
  const user = useSignedInUser();
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const postVotes = useAppSelector(selectPostVotes);

  return useEventCallback(async (vote: number, post: Post) => {
    try {
      const { voteStatus } = post;
      const existingVote = findPostVoteByPostId(postVotes, post.id);

      const batch = writeBatch(firestore);
      const updatedPost = { ...post };
      const updatedPosts = [...posts];
      const updatedPostVotes = [...postVotes];
      let voteChange = vote;

      // New vote
      // if (isNil(existingVote)) {
      // Add vote (set to 1 or -1)
      const posteVoteRef = doc(
        collection(firestore, "users", `${user?.uid}/postVotes`),
      );

      const newVote: PostVote = {
        id: posteVoteRef.id,
        postId: post.id,
        communityId: post.communityId,
        voteValue: vote,
      };

      // batch.set(posteVoteRef, newVote);

      // Update post vote count in store
      dispatch(setPostVoteByPostId(newVote));
      dispatch(updatePostById({ ...post, voteStatus: post.voteStatus + vote }));

      // } else {
      // if (removin) {
      //   // Remove vote (set to 0)
      //   // Delete post vote document
      // } else {
      //   // Flip vote (set to -1 -> 1 or 1 -> -1) => add 2 or subtract 2
      //   // Update post vote document add 2 or subtract 2
      // }
      // }

      // await batch.commit();
    } catch (error) {
      showNotificationError("Error voting post")(error);
    }
  });
};
