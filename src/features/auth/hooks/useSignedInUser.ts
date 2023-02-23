import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

export const useSignedInUser = () => useAuthState(auth)[0];
