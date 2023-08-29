import { firestore } from "@/firebase/clientApp";
import {
  doc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  runTransaction,
  Transaction,
} from "firebase/firestore";
import { ref } from "firebase/storage";
import { curry, curryN } from "ramda";

export const refV = curry(ref);
export const docV = curryN(3, doc);

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

export const throwIfDocumentExists = (doc: DocumentSnapshot) => {
  if (isDocumentExists(doc)) throw new Error("Document already exists.");
};
