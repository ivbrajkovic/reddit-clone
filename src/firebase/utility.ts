import { firestore } from "@/firebase/clientApp";
import {
  doc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  runTransaction,
  Transaction,
} from "firebase/firestore";
import { curryN } from "ramda";

export const isDocumentExists = (doc: DocumentSnapshot) => doc.exists();

export const docFromFirestore = curryN(
  2,
  (path: string, ...pathSegments: string[]) =>
    doc(firestore, path, ...pathSegments),
);

export const runTransactionAsync = <T>(
  callback: (transaction: Transaction) => Promise<T>,
) => runTransaction<T>(firestore, callback);

export const checkIfDocExists = async (docRef: DocumentReference) => {
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

export const throwIfDocExists = (doc: DocumentSnapshot) => {
  if (isDocumentExists(doc)) throw new Error("Document already exists.");
};
