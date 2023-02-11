import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

export const useSignedInUser = () => {
  const [user] = useAuthState(auth);
  return user;
};
