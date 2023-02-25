import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

export const useIsCreator = (creatorId?: string) => {
  const [user] = useAuthState(auth);
  return !!creatorId && user?.uid === creatorId;
};
