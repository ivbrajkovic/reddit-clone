import { auth } from "@/firebase/clientApp";
import { signOut } from "firebase/auth";
import { useCallback } from "react";

export const useSignOut = () => {
  const handleSignOut = useCallback(() => signOut(auth), []);
  return handleSignOut;
};
