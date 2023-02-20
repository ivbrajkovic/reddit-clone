import { showNotificationError } from "@/common/showNotificationError";
import { useAuthModalHandlers } from "@/features/auth/hooks/useAuthModalHandlers";
import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import { isUser } from "@/features/auth/utility";
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
import { AppDispatch } from "@/store/store";
import { collection, doc, writeBatch } from "firebase/firestore";

const getPostVoteRef = (userId: string, postVoteId: string) =>
  doc(firestore, "users", `${userId}/postVotes/${postVoteId}`);

const createNewVote = async (
  dispatch: AppDispatch,
  userId: string,
  vote: number,
  post: Post,
) => {
  const createPostVote = (id: string): PostVote => ({
    id,
    postId: post.id,
    communityId: post.communityId,
    voteValue: vote,
  });

  const createPostVoteRef = (userId: string) =>
    doc(collection(firestore, "users", `${userId}/postVotes`));

  // Change vote status
  const updatedPost = { ...post, voteStatus: post.voteStatus + vote };

  // Update post vote status in database
  const batch = writeBatch(firestore);
  const postRef = doc(firestore, "posts", post.id);
  batch.update(postRef, { voteStatus: updatedPost.voteStatus });

  // Create new vote
  const posteVoteRef = createPostVoteRef(userId);
  const newVote = createPostVote(posteVoteRef.id);
  batch.set(posteVoteRef, newVote);

  // Save changes to database
  await batch.commit();

  // Dispatch post vote changes to store
  dispatch(updatePost(updatedPost));
  dispatch(addPostVote(newVote));
};

const removeExistingVote = async (
  dispatch: AppDispatch,
  userId: string,
  vote: number,
  post: Post,
  existingVote: PostVote,
) => {
  // Change vote status
  const updatedPost = { ...post, voteStatus: post.voteStatus - vote };

  // Remove existing vote
  const batch = writeBatch(firestore);
  const postRef = doc(firestore, "posts", post.id);
  batch.update(postRef, { voteStatus: updatedPost.voteStatus });

  // Delete existing vote
  const postVoteRef = getPostVoteRef(userId, existingVote.id);
  batch.delete(postVoteRef);
  await batch.commit();

  // Dispatch post vote changes to store
  dispatch(updatePost(updatedPost));
  dispatch(deletePostVote(existingVote.id));
};

const updateExistingVote = async (
  dispatch: AppDispatch,
  userId: string,
  vote: number,
  post: Post,
  existingVote: PostVote,
) => {
  // Change vote status
  const updatedPost = { ...post, voteStatus: post.voteStatus + vote * 2 };

  // Update existing vote
  const batch = writeBatch(firestore);
  const postRef = doc(firestore, "posts", post.id);
  batch.update(postRef, { voteStatus: updatedPost.voteStatus });

  // Update existing vote
  const postVoteRef = getPostVoteRef(userId, existingVote.id);
  batch.update(postVoteRef, { voteValue: vote });
  await batch.commit();

  // Dispatch post vote changes to store
  dispatch(updatePost(updatedPost));
  dispatch(updatePostVote({ ...existingVote, voteValue: vote }));
};

const errorCreatePostVote = showNotificationError("Error creating post vote");

export const usePostVote = () => {
  const user = useSignedInUser();
  const dispatch = useAppDispatch();
  const { openLogin } = useAuthModalHandlers();
  const { votes, lookUpVoteIdByPostId } = useAppSelector(selectPostVotes);

  const getPostVoteByPostId = (postId: string): PostVote | undefined => {
    const voteId = lookUpVoteIdByPostId[postId];
    const vote = votes[voteId];
    return vote;
  };

  const handlePostVote = async (vote: number, post: Post) => {
    try {
      if (!isUser(user)) {
        openLogin();
        return;
      }

      const existingVote = getPostVoteByPostId(post.id);

      if (!existingVote) await createNewVote(dispatch, user.uid, vote, post);
      else if (existingVote.voteValue === vote)
        await removeExistingVote(dispatch, user.uid, vote, post, existingVote);
      else if (existingVote.voteValue !== vote)
        await updateExistingVote(dispatch, user.uid, vote, post, existingVote);
    } catch (error) {
      errorCreatePostVote(error);
    }
  };

  const incrementVote = useEventCallback((post: Post) =>
    handlePostVote(1, post),
  );
  const decrementVote = useEventCallback((post: Post) =>
    handlePostVote(-1, post),
  );

  return {
    votes,
    getPostVoteByPostId,
    incrementVote,
    decrementVote,
  };
};
