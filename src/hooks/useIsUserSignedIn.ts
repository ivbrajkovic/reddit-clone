import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

export const useIsUserSignedIn = () => {
  const [user] = useAuthState(auth);
  return !!user;
};
