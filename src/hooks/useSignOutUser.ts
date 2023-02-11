import { showNotificationError } from "@/common/showNotificationError";
import { logout } from "@/features/auth/authSlice";
import { auth } from "@/firebase/clientApp";
import { useAppDispatch } from "@/store/hooks";
import { signOut } from "firebase/auth";
import { useCallback } from "react";

export const useSignOutUser = () => {
  const dispatch = useAppDispatch();
  const handleSignOut = useCallback(() => {
    const dispatchLogout = () => dispatch(logout());
    signOut(auth)
      .then(dispatchLogout)
      .catch(showNotificationError("Sign out failed"));
  }, [dispatch]);
  return handleSignOut;
};
