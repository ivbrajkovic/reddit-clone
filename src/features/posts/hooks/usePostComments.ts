import { useEffect, useReducer, useState } from "react";

export const usePostComments = () => {
  const [comments, setComments] = useState([]);
  const [isFetchLoading, toggleFetchLoading] = useReducer((s) => !s, false);
  const [isCreateLoading, toggleCreateLoading] = useReducer((s) => !s, false);

  const createPostComments = async (commentText: string) => {};

  const deletePostComments = async (comment: any) => {};

  const updatePostComments = async () => {};

  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);
};
