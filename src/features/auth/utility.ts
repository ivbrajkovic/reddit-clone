import { firestore } from "@/firebase/clientApp";
import { User, UserCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

NonNullable<null>

const throwError = (message: string) => {
  throw new Error(message);
};

export const throwIfNotSignedIn = (user?: User | null) =>
  user ? user : throwError("User is not signed in.");

export const getUserIdOrThrow = (user?: User | null) =>
  throwIfNotSignedIn(user).uid;

export const parseUserForFirestore = (user: User) =>
  JSON.parse(JSON.stringify(user));

export const createUserInFirestore = async (
  userCredential?: UserCredential,
) => {
  if (!userCredential) return;
  const userDocRef = doc(firestore, "users", userCredential.user.uid);
  const parsedUser = parseUserForFirestore(userCredential.user);
  await setDoc(userDocRef, parsedUser);
};
